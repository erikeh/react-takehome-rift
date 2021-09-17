import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import ProgressDaysWidget from '../../ProgressDaysWidget';
import DeFiService from './index';
import Theme from '../../../Theme';
import '@testing-library/jest-dom';

/**
 * These are just some baseline integration tests to test core functionalities.
 * */

const defaultState = {
  balances: {
    USDC: 1000,
    compound: {
      amountDeposited: 0,
      accruedInterest: 0,
      APY: 0.05,
    },
    aave: {
      amountDeposited: 0,
      accruedInterest: 0,
      APY: 0.03,
    },
    curve: {
      amountDeposited: 0,
      accruedInterest: 0,
      APY: 0.025,
    },
  },
};

// fortunately this app only has one reducer, hence is easy to simply provide access to store to components for testing
const renderWithProviders = (ui) => {
  // const store = createStore(balancesReducer, defaultState);
  return render(
    <Provider store={store}>
      <Theme>{ui}</Theme>
    </Provider>,
  );
};

describe('Deposit Withdraw Buttons', () => {
  it('changes to correct color on click', () => {
    renderWithProviders(<DeFiService name={'Compound'} APY={0.05} />);

    const depositButton = screen.getByText('Deposit');
    const withdrawButton = screen.getByText('Withdraw');
    fireEvent.click(depositButton);
    expect(depositButton).toHaveStyle(`background-color: #F1FFFA`);
    expect(withdrawButton).toHaveStyle(`background-color: #80868a`);
    fireEvent.click(withdrawButton);
    expect(withdrawButton).toHaveStyle(`background-color: #F1FFFA`);
    expect(depositButton).toHaveStyle(`background-color: #80868a`);
  });
});

describe('transaction form', () => {
  it('deposits USDC into correct service', () => {
    renderWithProviders(<DeFiService name={'Compound'} APY={0.05} />);

    const input = screen.getByLabelText('Amount');
    const confirmTransactionButton = screen.getByText('Confirm');

    fireEvent.change(input, { target: { value: 100 } });
    fireEvent.click(confirmTransactionButton);

    expect(screen.getByTestId('amountDeposited')).toHaveTextContent(
      'Amount Deposited: 100',
    );
  });

  it('withrdraws USD from correct service', () => {
    renderWithProviders(<DeFiService name={'Compound'} APY={0.05} />);
    const withdrawButton = screen.getByText('Withdraw');
    const input = screen.getByLabelText('Amount');
    const confirmTransactionButton = screen.getByText('Confirm');
    fireEvent.change(input, { target: { value: 50 } });
    fireEvent.click(withdrawButton);
    fireEvent.click(confirmTransactionButton);

    expect(screen.getByTestId('amountDeposited')).toHaveTextContent(
      'Amount Deposited: 50',
    );
  });

  // it('withdraws all deposited and accrued interest');
});

describe('progress days widget', () => {
  it('accrues the correct amount based on days input', () => {
    renderWithProviders(<ProgressDaysWidget />);
    renderWithProviders(<DeFiService name={'Compound'} APY={0.05} />);

    const input = screen.getByLabelText('Days To Progress');
    const enterButton = screen.getByText('Enter');

    fireEvent.change(input, { target: { value: 65 } });
    fireEvent.click(enterButton);

    expect(screen.getByTestId('accruedInterest')).toHaveTextContent(
      'Accrued Interest: 0.46',
    );
  });
});
