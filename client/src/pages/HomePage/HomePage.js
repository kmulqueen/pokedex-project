import "./style.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon } from "../../actions/pokemonActions";
import AllPokemonView from "../../components/AllPokemonView";
import { ReactComponent as SearchIcon } from "../../images/icons/search-icon.svg";

const HomePage = () => {
  const dispatch = useDispatch();
  const { pokemon, loading } = useSelector((state) => state.getAllPokemon);

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Check for search input
    if (!search.length) {
      setList(pokemon);
    } else {
      // Check if search is name or number & set list to result if found
      if (isNaN(parseInt(search))) {
        const found = pokemon.filter(
          (item) => item.name.toLowerCase() === search.toLowerCase()
        );
        if (found) {
          setList(found);
        } else {
          setList([]);
        }
      } else {
        const found = pokemon.filter(
          (item) => parseInt(item.number) === parseInt(search)
        );
        if (found) {
          setList(found);
        } else {
          setList([]);
        }
      }
    }
  };

  useEffect(() => {
    if (!loading && pokemon === undefined) {
      dispatch(getAllPokemon());
    }
  }, [dispatch, loading, pokemon]);

  useEffect(() => {
    if (pokemon !== undefined) {
      setList(pokemon);
    }
  }, [pokemon]);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Pokédex</h1>
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

      <AllPokemonView
        pokemon={list.length ? list : pokemon}
        loading={loading}
      />
    </div>
  );
};

export default HomePage;
