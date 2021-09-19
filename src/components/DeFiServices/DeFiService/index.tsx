import React, { ReactElement, useState } from 'react';
import {
  Container,
  Section,
  Columns,
  Card,
  Box,
  Heading,
} from 'react-bulma-components';
import ToggleButtons from './ToggleButtons';
import TransactionForm from './TransactionForm';
import { useAppSelector } from '../../../typedHooks';
import styled from 'styled-components';

interface Props {
  name: string;
  APY: number;
}

const StyledCard = styled(Card)`
  height: 100%;
`

const ServiceContainer = styled(Box)`
  background-color: ${({ theme }) => theme.card.bgColor};
`;

const Header = styled.h2``;

const APYWrapper = styled.div``;

const BalancesContainer = styled(Section)`
  display: flex;
  flex-flow: column nowrap;
  /* height: 15%; */
  /* justify-content: space-around; */
  /* padding-bottom: 7%; */
  /* padding: 5px 0; */
`;

function DeFiService({ name, APY }: Props): ReactElement {
  const [isDepositing, setIsDepositing] = useState(true);

  const amountDeposited = useAppSelector(
    (state) => state.balances[name.toLowerCase()].amountDeposited,
  );
  const accruedInterest = useAppSelector(
    (state) => state.balances[name.toLowerCase()].accruedInterest,
  );

  return (
    <Columns.Column
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <StyledCard>
        <Container>
          <Container>
            <Card.Header textAlign="center" py={2} pl={3}>
              <Heading size={4} weight="normal" spaced={true}>
                {name}
              </Heading>
            </Card.Header>
          </Container>
          <Card.Content>
            <BalancesContainer px={5} py={3} pb={5}>
              <APYWrapper>{`APY: ${APY}`}</APYWrapper>
              <div data-testid="amountDeposited">{`Amount Deposited: ${amountDeposited}`}</div>
              <div data-testid="accruedInterest">{`Accrued Interest: ${accruedInterest}`}</div>
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
          </Card.Content>
        </Container>
      </StyledCard>
    </Columns.Column>
  );
}

export default DeFiService;
