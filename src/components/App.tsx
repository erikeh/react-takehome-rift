import * as React from 'react';
import BalanceDisplay from './BalanceDisplay';
import ProgressDaysWidget from './ProgressDaysWidget';
import DeFiServices from './DeFiServices';
import Heading from './Heading';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import Theme from '../Theme';
import GlobalStyle from '../globalStyles';

const HeaderWrapper = styled.div`
  display: flex;
  flex: 0 1 70%;
  flex-flow: row nowrap;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 50px;
  width: 100%;
  height: 200px;
`;

function App() {
  // This object is what we could imagine we would get back from an API or DB
  const services = [
    { name: 'Compound', APY: 0.05 },
    { name: 'Aave', APY: 0.03 },
    { name: 'Curve', APY: 0.025 },
  ];
  return (
    <Theme>
      <GlobalStyle />
      <Heading />
      <HeaderWrapper>
        <HeaderContainer>
          <BalanceDisplay />
          <ProgressDaysWidget />
        </HeaderContainer>
      </HeaderWrapper>

      <DeFiServices services={services}/>
    </Theme>
  );
}

declare let module: React.ReactElement;

export default hot(module)(App);
