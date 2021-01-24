import {
  GET_ALL_POKEMON_REQUEST,
  GET_ALL_POKEMON_SUCCESS,
  GET_ALL_POKEMON_FAIL,
} from "../actionTypes/pokemonTypes";

export const getAllPokemonReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_POKEMON_REQUEST:
      return { loading: true };
    case GET_ALL_POKEMON_SUCCESS:
      return { loading: false, pokemon: action.payload };
    case GET_ALL_POKEMON_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
