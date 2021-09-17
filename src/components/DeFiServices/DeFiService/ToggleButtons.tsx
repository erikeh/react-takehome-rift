import { SetState } from 'immer/dist/internal';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
  isDepositing: boolean;
  setIsDepositing: Dispatch<SetStateAction<boolean>>;
}

interface ButtonProps {
  isDepositing: boolean;
}

const ButtonsContainer = styled.section``;

const StyledButton = styled.button`
  background: none;
  border: 1px solid black;
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
