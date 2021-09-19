import React, { ReactElement } from 'react';
import { Hero, Heading } from 'react-bulma-components';
import styled from 'styled-components';

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Header(): ReactElement {
  return (
    <Hero>
      <Hero.Body>
        <Heading textColor="white" textAlign="center">
          DeFi Interest DashBoard
        </Heading>
      </Hero.Body>
    </Hero>
  );
}

export default Header;
