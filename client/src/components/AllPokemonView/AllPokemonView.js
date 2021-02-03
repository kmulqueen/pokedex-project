import "./style.css";
import PokemonItem from "../../components/PokemonItem";

const AllPokemonView = ({ pokemon, loading }) => {
  return (
    <section className="pokemon-view-container">
      {loading ? (
        <p>Loading...</p>
      ) : (!loading && pokemon === undefined) || (!loading && !pokemon) ? (
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
