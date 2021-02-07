import "./style.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList } from "../../actions/pokemonActions";
import { ReactComponent as SearchIcon } from "../../images/icons/search-icon.svg";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { pokemon } = useSelector((state) => state.getAllPokemon);

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Check for search input
    if (!search.length) {
      dispatch(setPokemonList(pokemon));
    } else {
      // Check if search is name or number & set list to result if found
      if (isNaN(parseInt(search))) {
        const found = pokemon.filter(
          (item) => item.name.toLowerCase() === search.toLowerCase()
        );
        if (found) {
          dispatch(setPokemonList(found));
        } else {
          dispatch(setPokemonList(pokemon));
        }
      } else {
        const found = pokemon.filter(
          (item) => parseInt(item.number) === parseInt(search)
        );
        if (found) {
          dispatch(setPokemonList(found));
        } else {
          dispatch(setPokemonList(pokemon));
        }
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="homepage-form">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        placeholder="Search Name or Number"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="homepage-form__input"
      />
      <button type="submit" className="homepage-form__button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
