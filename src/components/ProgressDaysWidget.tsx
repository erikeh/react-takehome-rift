import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Box } from 'react-bulma-components';
import { accrueInterest } from '../redux/slices/balancesSlice';
import { useAppDispatch, useAppSelector } from '../typedHooks';

const StyledBox = styled(Box)`
  @media screen and (max-width: 768px) {
    margin-bottom: 5%;
  }
`;

const WidgetContainer = styled.form`
  display: flex;
  flex-flow: column nowrap;
  flex: 0 1 40%;
  justify-content: space-evenly;
  height: 60%;
  align-items: center;
  /* background-color: ${({ theme }) => theme.card.bgColor}; */
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
  const services = useAppSelector((state) => state.balances);
  const dispatch = useAppDispatch();

  const handleDaysChange = (e) => {
    setDaysToProgress(e.target.value);
  };

  const handleAccrueInterest = (e) => {
    e.preventDefault();
    for (const service in services) {
      if (service === 'USDC') {
        continue;
      }
      const { APY, amountDeposited, accruedInterest } = services[service];
      console.log('APY: ', APY);
      console.log('amountDeposited: ', amountDeposited);
      console.log('accruedInterest: ', accruedInterest);
      const time = daysToProgress / 365;
      const interest =
        (amountDeposited + accruedInterest) * ((1 + APY / 12) ** 12 - 1) * time;
      console.log('interest: ', interest);
      console.log('--------');
      dispatch(
        accrueInterest({ interest: Number(interest.toFixed(2)), service }),
      );
    }
  };

  return (
    <StyledBox>
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
    </StyledBox>
  );
}

export default ProgressDaysWidget;
