import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByNumber } from "../../actions/pokemonActions";

const PokemonDetailsPage = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, pokemon, error } = useSelector(
    (state) => state.getPokemonByNumber
  );

  useEffect(() => {
    dispatch(getPokemonByNumber(match.params.number));
  }, [dispatch, match]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : !loading && !pokemon ? (
        <p>No Pokemon found...</p>
      ) : (
        !loading &&
        !error &&
        pokemon && (
          <>
            <h3>
              {pokemon.number < 10
                ? `00${pokemon.number}`
                : pokemon.number >= 10 && pokemon.number < 100
                ? `0${pokemon.number}`
                : pokemon.number >= 100
                ? `${pokemon.number}`
                : pokemon.number}{" "}
              - {pokemon.name}
            </h3>
            <img src={pokemon.image} alt={pokemon.name} />
          </>
        )
      )}
    </div>
  );
};

export default PokemonDetailsPage;
