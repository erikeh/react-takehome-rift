import * as React from 'react';
import BalanceDisplay from './BalanceDisplay';
import ProgressDaysWidget from './ProgressDaysWidget';
import DeFiServices from './DeFiServices';
import Header from './Header';
import { Level } from 'react-bulma-components';
import { hot } from 'react-hot-loader';
import Theme from '../Theme';
import GlobalStyle from '../globalStyles';

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
      <Header />

      <Level>
        <Level.Item>
          <BalanceDisplay />
        </Level.Item>
        <Level.Item>
          <ProgressDaysWidget />
        </Level.Item>
      </Level>

      <DeFiServices services={services} />
    </Theme>
  );
}

declare let module: React.ReactElement;

export default hot(module)(App);
