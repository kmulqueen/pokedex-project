import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList, getAllPokemon } from "../../actions/pokemonActions";
import PokemonItem from "../../components/PokemonItem";

const AllPokemonView = () => {
  const dispatch = useDispatch();
  const { pokemon, loading: allPokemonLoading } = useSelector(
    (state) => state.getAllPokemon
  );

  const { pokemonList, loading: pokemonListLoading } = useSelector(
    (state) => state.setPokemonList
  );

  useEffect(() => {
    if (!allPokemonLoading && pokemon === undefined) {
      dispatch(getAllPokemon());
    }
  }, [dispatch, allPokemonLoading, pokemon]);

  useEffect(() => {
    if (pokemon !== undefined && pokemonList === undefined) {
      dispatch(setPokemonList(pokemon));
    }
  }, [dispatch, pokemonList, pokemon]);

  return (
    <section className="pokemon-view-container">
      {pokemonListLoading || allPokemonLoading || pokemonList === undefined ? (
        <p className="pokemon-view-container__loading">Loading...</p>
      ) : !pokemonListLoading && !pokemonList.length ? (
        <p className="pokemon-view-container__not-found">No Pokemon Found.</p>
      ) : (
        !pokemonListLoading &&
        pokemonList !== undefined && (
          <div className="pokemon-view__list">
            {pokemonList.map((item) => (
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
            ))}
          </div>
        )
      )}
    </section>
  );
};

export default AllPokemonView;
