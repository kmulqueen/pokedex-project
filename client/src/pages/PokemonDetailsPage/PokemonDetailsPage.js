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
          <div className="details-page-container">
            <section className="pokemon-info">
              <div className="pokemon-image">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="pokemon-info__image"
                />
              </div>
              <div className="pokemon-basic">
                <h1 className="pokemon-basic__number">
                  No.{" "}
                  {pokemon.number < 10
                    ? `00${pokemon.number}`
                    : pokemon.number >= 10 && pokemon.number < 100
                    ? `0${pokemon.number}`
                    : pokemon.number}
                </h1>
                <h1 className="pokemon-basic__name">{pokemon.name}</h1>
                <h3 className="pokemon-basic__category">{pokemon.category}</h3>
              </div>
              <section className="pokemon-details">
                <div className="pokemon-details-info-container">
                  <h4 className="pokemon-details-label">Region</h4>
                  <h4 className="pokemon-details__region">{pokemon.region}</h4>
                  <h4 className="pokemon-details-label">Type</h4>
                  <h4 className="pokemon-details__type">
                    {pokemon.type.map((type) => type)}
                  </h4>
                  <h4 className="pokemon-details-label">Weaknesses</h4>
                  <h4 className="pokemon-details__weaknesses">
                    {pokemon.weaknesses.map((weakness) => weakness)}
                  </h4>
                  <h4 className="pokemon-details-label">Height</h4>
                  <h4 className="pokemon-details__height">{pokemon.height}</h4>
                  <h4 className="pokemon-details-label">Weight</h4>
                  <h4 className="pokemon-details__weight">{pokemon.weight}</h4>
                  <h4 className="pokemon-details-label">Abilities</h4>
                  <h4 className="pokemon-details__abilities">
                    {pokemon.abilities.map((ability) => ability.name)}
                  </h4>
                </div>
                <p className="pokemon-details__bio">{pokemon.bio}</p>
              </section>
            </section>
            {pokemon.evolutions !== null && (
              <section className="pokemon-evolutions">
                <h2 className="pokemon-evolutions__header">Evolutions</h2>
                <div className="pokemon-evolutions__evolutions">
                  {pokemon.evolutions.map((evolution, i) => (
                    <PokemonItem
                      key={i}
                      name={evolution.name}
                      number={evolution.number}
                      image={`https://www.serebii.net/pokemongo/pokemon/${evolution.number}.png`}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )
      )}
    </>
  );
};

export default PokemonDetailsPage;
