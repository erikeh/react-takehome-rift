import React, { ReactElement } from 'react';
import { useAppSelector } from '../typedHooks';
import styled from 'styled-components';

const BalanceDisplayContainer = styled.div`
  flex: 0 1 30%;
  border: 1px solid black;
`;

function BalanceDisplay(): ReactElement {
  const balance = useAppSelector((state) => state.balances.USDC);

  return (
    <BalanceDisplayContainer>
      {`USDC Balance: ${balance}`}
    </BalanceDisplayContainer>
  );
}

export default BalanceDisplay;
