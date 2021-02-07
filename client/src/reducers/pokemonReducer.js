import {
  GET_ALL_POKEMON_REQUEST,
  GET_ALL_POKEMON_SUCCESS,
  GET_ALL_POKEMON_FAIL,
  GET_POKEMON_BY_NUMBER_REQUEST,
  GET_POKEMON_BY_NUMBER_SUCCESS,
  GET_POKEMON_BY_NUMBER_FAIL,
  GET_POKEMON_BY_ID_REQUEST,
  GET_POKEMON_BY_ID_SUCCESS,
  GET_POKEMON_BY_ID_FAIL,
  SET_POKEMON_LIST_REQUEST,
  SET_POKEMON_LIST_SUCCESS,
  SET_POKEMON_LIST_FAIL,
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

export const getPokemonByNumberReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POKEMON_BY_NUMBER_REQUEST:
      return { loading: true };
    case GET_POKEMON_BY_NUMBER_SUCCESS:
      return { loading: false, pokemon: action.payload };
    case GET_POKEMON_BY_NUMBER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPokemonByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POKEMON_BY_ID_REQUEST:
      return { loading: true };
    case GET_POKEMON_BY_ID_SUCCESS:
      return { loading: false, pokemon: action.payload };
    case GET_POKEMON_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setPokemonListReducer = (state = [], action) => {
  switch (action.type) {
    case SET_POKEMON_LIST_REQUEST:
      return {
        loading: true,
      };
    case SET_POKEMON_LIST_SUCCESS:
      return {
        loading: false,
        pokemonList: action.payload,
      };
    case SET_POKEMON_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
