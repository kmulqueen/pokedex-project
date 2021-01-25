import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByNumber } from "../../actions/pokemonActions";
import PokemonItem from "../../components/PokemonItem";

const PokemonDetailsPage = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, pokemon, error } = useSelector(
    (state) => state.getPokemonByNumber
  );

  useEffect(() => {
    dispatch(getPokemonByNumber(match.params.number));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : !loading && !pokemon ? (
        <p>No Pokemon found...</p>
      ) : (
        !loading &&
        !error &&
        pokemon && (
          <section className="pokemon-details">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-details__image"
            />
            <h1 className="pokemon-details__number">
              No.{" "}
              {pokemon.number < 10
                ? `00${pokemon.number}`
                : pokemon.number >= 10 && pokemon.number < 100
                ? `0${pokemon.number}`
                : pokemon.number}
            </h1>
            <h1 className="pokemon-details__name">{pokemon.name}</h1>
            <h3 className="pokemon-details__category">{pokemon.category}</h3>
            <section className="pokemon-info">
              <h4 className="pokemon-info-label">Region</h4>
              <h4 className="pokemon-info__region">{pokemon.region}</h4>
              <h4 className="pokemon-info-label">Type</h4>
              <h4 className="pokemon-info__type">
                {pokemon.type.map((type) => type)}
              </h4>
              <h4 className="pokemon-info-label">Weaknesses</h4>
              <h4 className="pokemon-info__weaknesses">
                {pokemon.weaknesses.map((weakness) => weakness)}
              </h4>
              <h4 className="pokemon-info-label">Height</h4>
              <h4 className="pokemon-info__height">{pokemon.height}</h4>
              <h4 className="pokemon-info-label">Weight</h4>
              <h4 className="pokemon-info__weight">{pokemon.weight}</h4>
              <h4 className="pokemon-info-label">Abilities</h4>
              <h4 className="pokemon-info__abilities">
                {pokemon.abilities.map((ability) => ability.name)}
              </h4>
            </section>
            <section className="pokemon-bio">
              <p className="pokemon-bio__bio">{pokemon.bio}</p>
            </section>
            {pokemon.evolutions !== null && (
              <section className="pokemon-evolutions">
                {pokemon.evolutions.map((evolution, i) => (
                  <PokemonItem
                    key={i}
                    name={evolution.name}
                    number={evolution.number}
                    image={`https://www.serebii.net/pokemongo/pokemon/${evolution.number}.png`}
                  />
                ))}
              </section>
            )}
          </section>
        )
      )}
    </>
  );
};

export default PokemonDetailsPage;
