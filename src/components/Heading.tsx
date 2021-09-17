import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Heading(): ReactElement {
  return (
    <HeadingContainer>
      <h1>DeFi Interest DashBoard</h1>
    </HeadingContainer>
  );
}

export default Heading;
