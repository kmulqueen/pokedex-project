import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon } from "../../actions/pokemonActions";

const AllPokemonView = () => {
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
        pokemon.length &&
        pokemon.map((item) => (
          <div key={item._id}>
            <h3>
              {item.number < 10
                ? `00${item.number}`
                : item.number >= 10 && item.number < 100
                ? `0${item.number}`
                : item.number >= 100
                ? `${item.number}`
                : item.number}{" "}
              - {item.name}
            </h3>
            <img src={item.image} alt={item.name} />
          </div>
        ))
      )}
    </>
  );
};

export default AllPokemonView;
