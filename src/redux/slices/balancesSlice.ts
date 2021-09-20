import { createReducer, createAction } from '@reduxjs/toolkit';

export interface DeFiServiceBalances {
  amountDeposited: number;
  accruedInterest: number;
  APY: number;
}

export interface InitialBalancesState {
  USDC: number;
  compound: DeFiServiceBalances;
  aave: DeFiServiceBalances;
  curve: DeFiServiceBalances;
}

// interfaces for action payloads
interface TransactionActionPayload {
  amount: number;
  service: string;
}
interface AccrueInterestActionPayload {
  daysToProgress: number;
}
type WithdrawAllActionPayload = Omit<TransactionActionPayload, 'amount'>;

export const balancesState: InitialBalancesState = {
  USDC: 1000,
  compound: {
    amountDeposited: 0,
    accruedInterest: 0,
    APY: 0.05,
  },
  aave: {
    amountDeposited: 0,
    accruedInterest: 0,
    APY: 0.05,
  },
  curve: {
    amountDeposited: 0,
    accruedInterest: 0,
    APY: 0.05,
  },
};

// Create actions with createAction API
export const depositUSDC = createAction<number>('DEPOSIT_TO_USDC');
export const withdrawUSDC = createAction<number>('WITHDRAW_FROM_USDC');

export const depositToService =
  createAction<TransactionActionPayload>('DEPOSIT_TO_SERVICE');
export const withdrawFromService = createAction<TransactionActionPayload>(
  'WITHDRAW_FROM_SERVICE',
);
export const withdrawAllFromService = createAction<WithdrawAllActionPayload>(
  'WITHDRAW_ALL_FROM_SERVICE',
);
export const accrueInterest = createAction<AccrueInterestActionPayload>(
  'ACCRUE_INTEREST_FROM_SERVICE',
);

export const balancesReducer = createReducer<InitialBalancesState>(
  balancesState,
  (builder) => {
    builder
      .addCase(depositUSDC, (state, action) => {
        state.USDC += Number(action.payload);
      })
      .addCase(withdrawUSDC, (state, action) => {
        state.USDC -= Number(action.payload);
      })
      .addCase(depositToService, (state, action) => {
        state[action.payload.service].amountDeposited += Number(
          action.payload.amount,
        );
      })
      .addCase(withdrawFromService, (state, action) => {
        const withdrawAmount = action.payload.amount;
        const interest = state[action.payload.service].accruedInterest;
        // if there is interest, we withdraw from interest, then the rest from amountDeposited
        if (interest) {
          state[action.payload.service].amountDeposited -=
            withdrawAmount - interest;
          state[action.payload.service].accruedInterest = 0;
        } else {
          state[action.payload.service].amountDeposited -= withdrawAmount;
        }
      })
      .addCase(withdrawAllFromService, (state, action) => {
        state.USDC +=
          state[action.payload.service].amountDeposited +
          state[action.payload.service].accruedInterest;

        state[action.payload.service].amountDeposited = 0;
        state[action.payload.service].accruedInterest = 0;
      })
      .addCase(accrueInterest, (state, action) => {
        const daysToProgress = action.payload.daysToProgress;
        const time = daysToProgress / 365;
        for (const service in state) {
          if (service === 'USDC') {
            continue;
          }
          const { APY, amountDeposited, accruedInterest } = state[service];
          const interest =
            (amountDeposited + accruedInterest) *
            ((1 + APY / 12) ** 12 - 1) *
            time;
          state[service].accruedInterest += Number(interest.toFixed(2));
        }
      });
  },
);
