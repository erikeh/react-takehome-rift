import * as React from 'react';
import { hot } from 'react-hot-loader';

function App() {

  return (
    <div className="app">
      {/* <USDCBalance /> */}
      {/* <ProgressDaysWidget /> */}
      {/* <DeFiServices /> */}
    </div>
  );
}

declare let module: React.ReactElement;

export default hot(module)(App);
