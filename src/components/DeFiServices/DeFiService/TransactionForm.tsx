import React, { ReactElement, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../typedHooks';
import styled from 'styled-components';
import {
  depositUSDC,
  withdrawUSDC,
  depositToService,
  withdrawFromService,
  withdrawAllFromService,
} from '../../../redux/slices/balancesSlice';

interface Props {
  isDepositing: boolean;
  name: string;
  amountDeposited: number;
  accruedInterest: number;
}

const AmountForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 70%;
`;
const ConfirmButton = styled.button`
  margin: 10% 0;
  padding: 8px 25px;
`;
const WithdrawAllButton = styled.button`
  padding: 8px 35px;
`;

const LabelFieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const AmountField = styled.input`
  width: 50%;
  border: 0 0 1px 0;
  outline: none;
`;

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
      if (USDCBalance < (transactionAmount || 0)) {
        alert('not enough funds!');
      } else {
        dispatch(withdrawUSDC(transactionAmount || 0));
        dispatch(
          depositToService({
            amount: transactionAmount || 0,
            service: name.toLowerCase(),
          }),
        );
      }
    } else if (amountDeposited + accruedInterest < (transactionAmount || 0)) {
      alert('not enough funds!');
    } else {
      dispatch(depositUSDC(transactionAmount || 0));
      dispatch(
        withdrawFromService({
          amount: transactionAmount || 0,
          service: name.toLowerCase(),
        }),
      );
    }
  };

  const handleWithdrawAll = () => {
    dispatch(withdrawAllFromService({ service: name.toLowerCase() }));
  };

  return (
    <>
      <AmountForm onSubmit={handleSubmitTransaction}>
        <LabelFieldContainer>
          <label>Amount</label>
          <AmountField value={transactionAmount} onChange={handleChange} />
        </LabelFieldContainer>
      </AmountForm>
      <ConfirmButton onClick={handleSubmitTransaction}>Confirm</ConfirmButton>
      <WithdrawAllButton onClick={handleWithdrawAll}>
        Withdraw All
      </WithdrawAllButton>
    </>
  );
}

export default TransactionForm;
