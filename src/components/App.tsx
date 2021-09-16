import * as React from 'react';
import DeFiServices from './DeFiServices';
import { hot } from 'react-hot-loader';
import Theme from '../Theme';

function App() {
  return (
    <Theme>
      <div>
        {/* <USDCBalance /> */}
        {/* <ProgressDaysWidget /> */}
        <DeFiServices />
      </div>
    </Theme>
  );
}

declare let module: React.ReactElement;

export default hot(module)(App);
