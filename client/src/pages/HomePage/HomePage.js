import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon } from "../../actions/pokemonActions";
import AllPokemonView from "../../components/AllPokemonView";

const HomePage = () => {
  const dispatch = useDispatch();
  const { pokemon, loading } = useSelector((state) => state.getAllPokemon);

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
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
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Pokemon name"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">Search</button>
      </form>

      <AllPokemonView pokemon={list.length && list} loading={loading} />
    </div>
  );
};

export default HomePage;
