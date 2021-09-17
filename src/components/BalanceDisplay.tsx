import React, { ReactElement } from 'react';
import { useAppSelector } from '../typedHooks';
import styled from 'styled-components';

const BalanceDisplayContainer = styled.div`
  display: flex;
  flex: 0 1 30%;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.card.bgColor};
  font-size: ${({ theme }) => theme.header.fontSize};
`;

function BalanceDisplay(): ReactElement {
  const balance = useAppSelector((state) => state.balances.USDC);

  return (
    <BalanceDisplayContainer>
      <p>{`USDC Balance: ${balance}`}</p>
    </BalanceDisplayContainer>
  );
}

export default BalanceDisplay;
