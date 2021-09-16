import { balancesReducer, InitialBalancesState } from './balancesSlice';
import { balancesState } from './balancesSlice';
import {
  depositUSDC,
  withdrawUSDC,
  depositToService,
  withdrawFromService,
  withdrawAllFromService,
  accrueInterest,
} from './balancesSlice';

describe('redux balances slice', () => {
  it('should return default state', () => {
    expect(balancesReducer(undefined, {})).toEqual(balancesState);
  });

  it('should add usdc when depositUSDC action is dispatched', () => {
    const initialState = {
      USDC: 1000,
    };
    const expectedState = {
      USDC: 1100,
    };
    expect(
      balancesReducer(initialState as InitialBalancesState, depositUSDC(100)),
    ).toEqual(expectedState);
  });

  it('should subtract usdc when withdrawUSDC action is dispatched', () => {
    const initialState = {
      USDC: 1000,
    };
    const expectedState = {
      USDC: 900,
    };
    expect(
      balancesReducer(initialState as InitialBalancesState, withdrawUSDC(100)),
    ).toEqual(expectedState);
  });

  it('should add amountDeposited to correct service when depositToService action is dispatched', () => {
    const initialState = {
      aave: {
        amountDeposited: 0,
        accruedInterest: 0,
      },
    };
    const expectedState = {
      aave: {
        amountDeposited: 100,
        accruedInterest: 0,
      },
    };
    expect(
      balancesReducer(
        initialState as InitialBalancesState,
        depositToService({ amount: 100, service: 'aave' }),
      ),
    ).toEqual(expectedState);
  });

  it('should subtract from correct service when withdrawFromService action is dispatched', () => {
    const initialState = {
      compound: {
        amountDeposited: 100,
        accruedInterest: 0,
      },
    };
    const expectedState = {
      compound: {
        amountDeposited: 50,
        accruedInterest: 0,
      },
    };
    expect(
      balancesReducer(
        initialState as InitialBalancesState,
        withdrawFromService({ amount: 50, service: 'compound' }),
      ),
    ).toEqual(expectedState);
  });

  it('should subtract from interest first if there is interest', () => {
    const initialState = {
      compound: {
        amountDeposited: 100,
        accruedInterest: 1.5,
      },
    };
    const expectedState = {
      compound: {
        amountDeposited: 51.5,
        accruedInterest: 0,
      },
    };
    expect(
      balancesReducer(
        initialState as InitialBalancesState,
        withdrawFromService({ amount: 50, service: 'compound' }),
      ),
    ).toEqual(expectedState);
  });

  it('should withdraw amountDeposited and accruedInterest when withdrawAllFromService action is dispatched', () => {
    const initialState = {
      USDC: 0,
      aave: {
        amountDeposited: 100,
        accruedInterest: 1.5,
      },
    };
    const expectedState = {
      USDC: 101.5,
      aave: {
        amountDeposited: 0,
        accruedInterest: 0,
      },
    };
    expect(
      balancesReducer(
        initialState as InitialBalancesState,
        withdrawAllFromService({ service: 'aave' }),
      ),
    );
  });

  it('should accrue interest when accrueInterest action is dispatched', () => {
    const initialState = {
      curve: {
        amountDeposited: 100,
        accruedInterest: 1.5,
      },
    };
    const expectedState = {
      curve: {
        amountDeposited: 100,
        accruedInterest: 4.2,
      },
    };
    expect(
      balancesReducer(
        initialState as InitialBalancesState,
        accrueInterest({ amount: 2.7, service: 'curve' }),
      ),
    ).toEqual(expectedState);
  });
});
