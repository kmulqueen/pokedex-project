import "./style.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
        <>
          <Link to="/">Go Home</Link>
          <p>No Pokemon found...</p>
        </>
      ) : (
        !loading &&
        !error &&
        pokemon && (
          <div className="details-page-container">
            <section className="pokemon-info">
              <Link to="/" className="home-link">
                Go Home
              </Link>
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
              </div>
              <section className="pokemon-details">
                <div className="pokemon-details-info-container">
                  <p className="pokemon-details-label">Region</p>
                  <p className="pokemon-details-info pokemon-details__region">
                    {pokemon.region}
                  </p>
                  <p className="pokemon-details-label">Category</p>
                  <p className="pokemon-details-info pokemon-details__category">
                    {pokemon.category}
                  </p>
                  <p className="pokemon-details-label">Type</p>
                  <p className="pokemon-details-info pokemon-details__type">
                    {pokemon.type.map((type, idx) =>
                      idx === pokemon.type.length - 1 ? type : `${type}, `
                    )}
                  </p>
                  <p className="pokemon-details-label">Weaknesses</p>
                  <p className="pokemon-details-info pokemon-details__weaknesses">
                    {pokemon.weaknesses.map((weakness, idx) =>
                      idx === pokemon.weaknesses.length - 1
                        ? weakness
                        : `${weakness}, `
                    )}
                  </p>
                  <p className="pokemon-details-label">Height</p>
                  <p className="pokemon-details-info pokemon-details__height">
                    {pokemon.height}
                  </p>
                  <p className="pokemon-details-label">Weight</p>
                  <p className="pokemon-details-info pokemon-details__weight">
                    {pokemon.weight}
                  </p>
                  <p className="pokemon-details-label">Abilities</p>
                  <p className="pokemon-details-info pokemon-details__abilities">
                    {pokemon.abilities.map((ability, idx) =>
                      idx === pokemon.abilities.length - 1
                        ? ability.name
                        : `${ability.name}, `
                    )}
                  </p>
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
