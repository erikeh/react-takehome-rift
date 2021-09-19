import React, { ReactElement, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../typedHooks';
import { Form, Button } from 'react-bulma-components';
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

const AmountForm = styled(Form.Field)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;
const ConfirmButton = styled(Button)`
  margin: 10% 0;
  padding: 8px 25px;
`;
const WithdrawAllButton = styled(Button)`
  padding: 8px 35px;
`;

const StyledFormControl = styled(Form.Control)`
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
`;

const AmountInput = styled(Form.Input)``;

function TransactionForm({
  name,
  isDepositing,
  amountDeposited,
  accruedInterest,
}: Props): ReactElement {
  const [transactionAmount, setTransactionAmount] = useState<
    number | undefined
  >('');
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
      <AmountForm>
        <Form.Label>Amount</Form.Label>
        <StyledFormControl>
          <AmountInput
            type="number"
            value={transactionAmount}
            onChange={handleChange}
            onFocus={() => setTransactionAmount('')}
          />
          <ConfirmButton onClick={handleSubmitTransaction} alignSelf="center">
            Confirm
          </ConfirmButton>
        </StyledFormControl>
        <WithdrawAllButton onClick={handleWithdrawAll}>
          Withdraw All
        </WithdrawAllButton>
      </AmountForm>
    </>
  );
}

export default TransactionForm;
