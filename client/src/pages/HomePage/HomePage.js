import "./style.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon } from "../../actions/pokemonActions";
import AllPokemonView from "../../components/AllPokemonView";
import { ReactComponent as SearchIcon } from "../../images/icons/search-icon.svg";

const HomePage = () => {
  const dispatch = useDispatch();
  const { pokemon, loading } = useSelector((state) => state.getAllPokemon);

  const pokemonTypes = [
    "Bug",
    "Dark",
    "Dragon",
    "Electric",
    "Fairy",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Steel",
    "Water",
  ];

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState([]);
  const [filterWeakness, setFilterWeakness] = useState([]);

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

  const handleTypeClick = (e) => {
    e.stopPropagation();
    const type = e.target.getAttribute("name");
    const classes = e.target.classList;
    const activeClass = "filter-li__option--active";
    // Check if type already exists in filterType array
    if (filterType.includes(type)) {
      // Remove type from array
      const oldArr = [...filterType];
      const updatedArr = oldArr.filter(
        (name) => name.toLowerCase() !== type.toLowerCase()
      );
      setFilterType([...updatedArr]);
      // Remove active class
      classes.remove(activeClass);
    } else {
      // Add type to array
      setFilterType([...filterType, type]);
      // Add active class
      classes.add(activeClass);
    }
  };

  const handleWeaknessClick = (e) => {
    e.stopPropagation();
    const weakness = e.target.getAttribute("name");
    const classes = e.target.classList;
    const activeClass = "filter-li__option--active";
    // Check if weakness already exists in filterWeakness array
    if (filterWeakness.includes(weakness)) {
      // Remove weakness from array
      const oldArr = [...filterWeakness];
      const updatedArr = oldArr.filter(
        (name) => name.toLowerCase() !== weakness.toLowerCase()
      );
      setFilterWeakness([...updatedArr]);
      // Remove active class
      classes.remove(activeClass);
    } else {
      // Add weakness to array
      setFilterWeakness([...filterWeakness, weakness]);
      // Add active class
      classes.add(activeClass);
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
      <ul className="form-advanced__filter">
        {pokemonTypes.map((type) => (
          <li className="filter-li" key={type}>
            <span className={`filter-li__label filter-li__label--${type}`}>
              {type}
            </span>
            <span
              className="filter-li__option filter-li__type"
              name={type}
              onClick={handleTypeClick}
            >
              T
            </span>
            <span
              className="filter-li__option filter-li__weakness"
              name={type}
              onClick={handleWeaknessClick}
            >
              W
            </span>
          </li>
        ))}
      </ul>

      <AllPokemonView
        pokemon={list.length ? list : pokemon}
        loading={loading}
      />
    </div>
  );
};

export default HomePage;
