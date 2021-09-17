import React, { ReactElement, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../typedHooks';
import styled from 'styled-components';
import {
  depositUSDC,
  withdrawUSDC,
  depositToService,
  withdrawFromService,
} from '../../../redux/slices/balancesSlice';

interface Props {
  isDepositing: boolean;
  name: string;
  amountDeposited: number;
  accruedInterest: number;
}

const ConfirmButton = styled.button``;

const AmountForm = styled.form``;

const AmountField = styled.input``;


function TransactionForm({
  name,
  isDepositing,
  amountDeposited,
  accruedInterest,
}: Props): ReactElement {
  const [transactionAmount, setTransactionAmount] = useState(0);
  const USDCBalance = useAppSelector((state) => state.balances.USDC);
  const dispatch = useAppDispatch();

  // handlers
  const handleChange = (e) => {
    e.preventDefault();
    setTransactionAmount(e.target.value);
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    if (isDepositing) {
      if (USDCBalance < transactionAmount) {
        alert('not enough funds!');
      } else {
        dispatch(withdrawUSDC(transactionAmount));
        dispatch(
          depositToService({
            amount: transactionAmount,
            service: name.toLowerCase(),
          }),
        );
      }
    } else {
      if (amountDeposited + accruedInterest < transactionAmount) {
        alert('not enough funds!');
      } else {
        dispatch(depositUSDC(transactionAmount));
        dispatch(
          withdrawFromService({
            amount: transactionAmount,
            service: name.toLowerCase(),
          }),
        );
      }
    }
  };

  return (
    <>
      <AmountForm onSubmit={handleSubmitTransaction}>
        <label>Amount</label>
        <AmountField value={transactionAmount} onChange={handleChange} />
        <ConfirmButton type="submit">Confirm</ConfirmButton>
      </AmountForm>
    </>
  );
}

export default TransactionForm;
