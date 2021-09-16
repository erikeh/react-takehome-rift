import { combineReducers } from 'redux';
import { balancesReducer } from './slices/balancesSlice';

const rootReducer = combineReducers({
  balances: balancesReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
