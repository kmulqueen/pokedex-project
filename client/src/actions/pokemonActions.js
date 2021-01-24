import axios from "axios";
import {
  GET_ALL_POKEMON_REQUEST,
  GET_ALL_POKEMON_SUCCESS,
  GET_ALL_POKEMON_FAIL,
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
