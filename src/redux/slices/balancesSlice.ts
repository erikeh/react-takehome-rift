import { createReducer, createAction } from '@reduxjs/toolkit';

interface DeFiServiceBalances {
  amountDeposited: number;
  accruedInterest: number;
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
type WithdrawAllActionPayload = Omit<TransactionActionPayload, 'amount'>;

export const balancesState: InitialBalancesState = {
  USDC: 1000,
  compound: {
    amountDeposited: 0,
    accruedInterest: 0,
  },
  aave: {
    amountDeposited: 0,
    accruedInterest: 0,
  },
  curve: {
    amountDeposited: 0,
    accruedInterest: 0,
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
export const accrueInterest = createAction<TransactionActionPayload>(
  'ACCRUE_INTEREST_FROM_SERVICE',
);

export const balancesReducer = createReducer<InitialBalancesState>(
  balancesState,
  (builder) => {
    builder
      .addCase(depositUSDC, (state, action) => {
        state.USDC += action.payload;
      })
      .addCase(withdrawUSDC, (state, action) => {
        state.USDC -= action.payload;
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
        state[action.payload.service].accruedInterest += action.payload.amount;
      });
  },
);
