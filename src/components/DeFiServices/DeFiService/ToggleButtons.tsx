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

const ButtonsContainer = styled.section`
  display: flex;
  align-items: center;
  height: 12%;
  margin-bottom: 7%;
`;

const StyledButton = styled.button`
  background: none;
  border: 1px solid black;
  padding: 10px 15px;
`;

const DepositButton = styled(StyledButton)<ButtonProps>`
  background-color: ${({ theme, isDepositing }) =>
    isDepositing ? theme.buttonActive : theme.buttonInActive};
  transition: background-color 0.3s;
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
