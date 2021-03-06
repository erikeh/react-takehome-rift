import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { accrueInterest } from '../redux/slices/balancesSlice';
import { useAppDispatch, useAppSelector } from '../typedHooks';

const WidgetContainer = styled.form`
  display: flex;
  flex-flow: column nowrap;
  flex: 0 1 40%;
  justify-content: space-evenly;
  height: 60%;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.card.bgColor};
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.header.fontSize};
`;

const StyledInput = styled.input`
  margin-left: 8px;
  height: auto;
`;

const StyledButton = styled.button`
  padding: 2px 20px;
`;

function ProgressDaysWidget(): ReactElement {
  const [daysToProgress, setDaysToProgress] = useState(0);
  const dispatch = useAppDispatch();

  const handleDaysChange = (e) => {
    setDaysToProgress(e.target.value);
  };

  const handleAccrueInterest = (e) => {
    e.preventDefault();
    dispatch(accrueInterest({ daysToProgress }));
  };

  return (
    <WidgetContainer onSubmit={handleAccrueInterest}>
      <StyledRow>
        <StyledLabel>
          Days To Progress
          <StyledInput
            value={daysToProgress}
            placeholder="365"
            onChange={handleDaysChange}
          />
        </StyledLabel>
      </StyledRow>
      <StyledRow>
        <StyledButton type="submit">Enter</StyledButton>
      </StyledRow>
    </WidgetContainer>
  );
}

export default ProgressDaysWidget;
