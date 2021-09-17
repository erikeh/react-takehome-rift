import React, { ReactElement, useState } from 'react';
import ToggleButtons from './ToggleButtons';
import TransactionForm from './TransactionForm';
import { useAppSelector, useAppDispatch } from '../../../typedHooks';
import styled from 'styled-components';

interface Props {
  name: string;
  APY: number;
}

const ServiceContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  width: clamp(10em, 35%, 20em);
  border: 1px solid black;
  height: 500px;
  margin: 0 20px;
`;

const Header = styled.h2``;

const APYWrapper = styled.div``;

const BalancesContainer = styled.section``;

function DeFiService({ name, APY }: Props): ReactElement {
  const [isDepositing, setIsDepositing] = useState(true);
  const dispatch = useAppDispatch();

  const amountDeposited = useAppSelector(
    (state) => state.balances[name.toLowerCase()].amountDeposited,
  );
  const accruedInterest = useAppSelector(
    (state) => state.balances[name.toLowerCase()].accruedInterest,
  );

  return (
    <ServiceContainer>
      <Header>{name}</Header>
      <APYWrapper>{`APY: ${APY}`}</APYWrapper>

      <BalancesContainer>
        <div>{`Amount Deposited: ${amountDeposited}`}</div>
        <div>{`Accrued Interest: ${accruedInterest}`}</div>
      </BalancesContainer>

      <ToggleButtons
        isDepositing={isDepositing}
        setIsDepositing={setIsDepositing}
      />

      <TransactionForm
        name={name}
        isDepositing={isDepositing}
        amountDeposited={amountDeposited}
        accruedInterest={accruedInterest}
      />
    </ServiceContainer>
  );
}

export default DeFiService;
