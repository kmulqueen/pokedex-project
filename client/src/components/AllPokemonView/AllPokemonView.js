import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon } from "../../actions/pokemonActions";
import { Link } from "react-router-dom";

const AllPokemonView = () => {
  const dispatch = useDispatch();
  const { pokemon, loading } = useSelector((state) => state.getAllPokemon);

  useEffect(() => {
    dispatch(getAllPokemon());
  }, [dispatch]);
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
          <div className="pokemon-item" key={item._id}>
            <Link
              to={
                item.number < 10
                  ? `/pokemon/number/00${item.number}`
                  : item.number >= 10 && item.number < 100
                  ? `/pokemon/number/0${item.number}`
                  : item.number >= 100 && `/pokemon/number/${item.number}`
              }
              className="pokemon-link"
            >
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
            </Link>
          </div>
        ))
      )}
    </section>
  );
};

export default AllPokemonView;
