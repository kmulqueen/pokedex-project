import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon } from "./actions/pokemonActions";

function App() {
  const dispatch = useDispatch();
  const { pokemon, loading } = useSelector((state) => state.getAllPokemon);

  useEffect(() => {
    dispatch(getAllPokemon());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : !loading && pokemon === undefined ? (
        <p>No Pokemon found...</p>
      ) : (
        !loading &&
        pokemon.length && (
          <>
            <img src={pokemon[0].image} alt={pokemon[0].name} />
            <p>{pokemon[0].name}</p>
          </>
        )
      )}
    </>
  );
}

export default App;
