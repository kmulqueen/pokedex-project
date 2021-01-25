import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon } from "../../actions/pokemonActions";
import PokemonItem from "../../components/PokemonItem";

const AllPokemonView = () => {
  const dispatch = useDispatch();
  const { pokemon, loading } = useSelector((state) => state.getAllPokemon);

  useEffect(() => {
    if (!loading && pokemon === undefined) {
      dispatch(getAllPokemon());
    }
  }, [dispatch, loading, pokemon]);
  return (
    <section className="pokemon-view-container">
      {loading ? (
        <p>Loading...</p>
      ) : !loading && pokemon === undefined ? (
        <p>No Pokemon found...</p>
      ) : (
        !loading &&
        pokemon.length &&
        pokemon.map((item) => (
          <PokemonItem
            key={item._id}
            name={item.name}
            number={
              item.number < 10
                ? `00${item.number}`
                : item.number >= 10 && item.number < 100
                ? `0${item.number}`
                : item.number
            }
            image={item.image}
          />
        ))
      )}
    </section>
  );
};

export default AllPokemonView;
