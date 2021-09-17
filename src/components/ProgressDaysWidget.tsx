import React, { ReactElement } from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex: 0 1 40%;
  align-items: center;
  border: 1px solid black;
`;

const DaysToProgress = styled.p`
  font-size: ${({ theme }) => theme.header.fontSize};
`;

const DaysInputField = styled.input`

`;

const ProgressButton = styled.button``;

function ProgressDaysWidget(): ReactElement {
  return (
    <WidgetContainer>
      <DaysToProgress>Days To Progress</DaysToProgress>
      <DaysInputField placeholder="365" />
      <ProgressButton>Enter</ProgressButton>
    </WidgetContainer>
  );
}

export default ProgressDaysWidget;
