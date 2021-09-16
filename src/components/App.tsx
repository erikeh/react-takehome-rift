import * as React from "react";
import { hot } from "react-hot-loader";

function App() {
    return (
      <div className="app">
        <h1>Hello!</h1>
        <p>This is a template for React</p>
      </div>
    );
}

declare let module: React.ReactElement;

export default hot(module)(App);
