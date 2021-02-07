import axios from "axios";
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

export const getAllPokemon = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POKEMON_REQUEST });

    const res = await axios.get("/api/pokemon");

    dispatch({
      type: GET_ALL_POKEMON_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_POKEMON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPokemonById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POKEMON_BY_ID_REQUEST });

    const res = await axios.get(`/api/pokemon/id/${id}`);

    dispatch({
      type: GET_POKEMON_BY_ID_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POKEMON_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPokemonByNumber = (number) => async (dispatch) => {
  try {
    dispatch({ type: GET_POKEMON_BY_NUMBER_REQUEST });

    const res = await axios.get(`/api/pokemon/number/${number}`);

    dispatch({
      type: GET_POKEMON_BY_NUMBER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POKEMON_BY_NUMBER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setPokemonList = (list) => async (dispatch) => {
  try {
    dispatch({ type: SET_POKEMON_LIST_REQUEST });

    dispatch({
      type: SET_POKEMON_LIST_SUCCESS,
      payload: list,
    });
  } catch (error) {
    dispatch({
      type: SET_POKEMON_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
