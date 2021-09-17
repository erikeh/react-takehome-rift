# Interest Rate DashBoard App

## Installation
1. run `npm install`
2. run `npm start`
3. access app at `localhost:8080
4. Optionally run `npm test` for basic redux unit tests

## Known Bugs
- the APY calculation works properly on first computation, but on subsequent computations it seems to calculate APY based on the interest, not the total value. This is probably a simple-ish fix but moving on for now to keep progress going.
-

## Notes about architecture
- The app uses redux to manage the balances of the different DeFi Services. It may be a little over kill for a small app, but a global state management would likely be useful if this app were to scale.
- For styled components naming convention, 'Container' is used when it holds more than one JSX element, whereas 'Wrapper' holds just one element.

