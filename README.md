# Interest Rate DashBoard App

## Installation
1. run `npm install`
2. run `npm start`
3. access app at `localhost:8080
4. Optionally run `npm test` for basic redux unit/integration tests

## Known Bugs
- the APY calculation works properly on first computation, but on subsequent computations it seems to calculate APY based on the interest, not the total value. This is probably a simple-ish fix but moving on for now to keep progress going.

## Notes
- APY is accrued MONTHLY. This was arbitrary and can easily be changed.
- The app uses redux to manage the balances of the different DeFi Services. It may be a little over kill for a small app, but a global state management would likely be useful if this app were to scale.
- For styled components naming convention, 'Container' is used when it holds more than one JSX element, whereas 'Wrapper' holds just one element.

## File Structure
- The redux portion follows a 'ducks' approach, keeping the related actions, reducers in the same file. Due to the slice being pretty small, I kept the types inside the same file as well for easier reference.
- For components, I try to keep styles and component in one file until the file becomes to unwieldy and split up into styles, index, test etc. In this case, I did not find it neccessary to split out the styles from the component.
- When components are placed into a folder for nesting and grouping, I use `index.tsx` for clearer imports.

