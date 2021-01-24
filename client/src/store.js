import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllPokemonReducer,
  getPokemonByIdReducer,
  getPokemonByNumberReducer,
} from "./reducers/pokemonReducer";

const reducer = combineReducers({
  getAllPokemon: getAllPokemonReducer,
  getPokemonById: getPokemonByIdReducer,
  getPokemonByNumber: getPokemonByNumberReducer,
});

const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
