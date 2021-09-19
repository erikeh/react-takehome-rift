import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Button, Section, Container } from 'react-bulma-components';
import styled from 'styled-components';

interface Props {
  isDepositing: boolean;
  setIsDepositing: Dispatch<SetStateAction<boolean>>;
}

interface ButtonProps {
  isDepositing: boolean;
}

const ButtonsContainer = styled(Container)`
  display: flex;
  justify-content: center;
  height: 12%;
  margin-bottom: 7%;
`;

const StyledButton = styled(Button)`
  transition: background-color 0.3s;
`;

const DepositButton = styled(StyledButton)<ButtonProps>`
  background-color: ${({ theme, isDepositing }) =>
    isDepositing ? theme.buttonActive : theme.buttonInActive};
`;

const WithdrawButton = styled(StyledButton)<ButtonProps>`
  background-color: ${({ theme, isDepositing }) =>
    !isDepositing ? theme.buttonActive : theme.buttonInActive};
`;

function ToggleButtons({ isDepositing, setIsDepositing }: Props): ReactElement {
  return (
    <ButtonsContainer>
      <DepositButton
        isDepositing={isDepositing}
        onClick={() => setIsDepositing(true)}
        outlined={false}
      >
        Deposit
      </DepositButton>
      <WithdrawButton
        isDepositing={isDepositing}
        onClick={() => setIsDepositing(false)}
      >
        Withdraw
      </WithdrawButton>
    </ButtonsContainer>
  );
}

export default ToggleButtons;
