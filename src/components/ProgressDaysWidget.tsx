import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import {
  accrueInterest,
  DeFiServiceBalances,
} from '../redux/slices/balancesSlice';
import { useAppDispatch, useAppSelector } from '../typedHooks';

const WidgetContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex: 0 1 40%;
  align-items: center;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.bgColor};
`;

const DaysToProgress = styled.p`
  font-size: ${({ theme }) => theme.header.fontSize};
`;

const DaysInputField = styled.input``;
const ProgressButton = styled.button``;

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
      const time = daysToProgress / 365;
      const interest =
        (amountDeposited + accruedInterest) * ((1 + APY / 12) ** 12 - 1) * time;
      dispatch(
        accrueInterest({ interest: Number(interest.toFixed(2)), service }),
      );
    }
  };

  return (
    <WidgetContainer>
      <DaysToProgress>Days To Progress</DaysToProgress>
      <DaysInputField
        value={daysToProgress}
        placeholder="365"
        onChange={handleDaysChange}
      />
      <ProgressButton onClick={handleAccrueInterest}>Enter</ProgressButton>
    </WidgetContainer>
  );
}

export default ProgressDaysWidget;
