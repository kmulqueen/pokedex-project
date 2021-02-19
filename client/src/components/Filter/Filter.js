import "./style.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList } from "../../actions/pokemonActions";

const Filter = () => {
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

  const dispatch = useDispatch();
  const { pokemon } = useSelector((state) => state.getAllPokemon);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterType, setFilterType] = useState([]);
  const [filterWeakness, setFilterWeakness] = useState([]);

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

  const handleTypeKeyPress = (e) => {
    e.stopPropagation();
    const enterOrSpace =
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "Spacebar" ||
      e.which === 13 ||
      e.which === 32;
    if (enterOrSpace) {
      e.preventDefault();
      handleTypeClick(e);
    }
  };
  const handleWeaknessKeyPress = (e) => {
    e.stopPropagation();
    const enterOrSpace =
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "Spacebar" ||
      e.which === 13 ||
      e.which === 32;
    if (enterOrSpace) {
      e.preventDefault();
      handleWeaknessClick(e);
    }
  };

  const handleApplyFilter = () => {
    // Create function to compare type/weakness arrays
    const compareTypesWeaknesses = (arr1, arr2) =>
      arr1.length === arr2.length &&
      arr1.every((val, idx) => val.toLowerCase() === arr2[idx].toLowerCase());

    // Initialize new list of pokemon to display
    const newList = [];

    // Check for length in BOTH type/weakness arrays
    if (filterType.length && filterWeakness.length) {
      pokemon.forEach((item) => {
        if (
          filterType.length === item.type.length &&
          filterWeakness.length === item.weaknesses.length
        ) {
          // Create comparison array that contains types sorted alphabetically and then weaknesses sorted alphabetically
          const compArr = [...filterType.sort(), ...filterWeakness.sort()];
          const pokemonSortedArr = [
            ...item.type.sort(),
            ...item.weaknesses.sort(),
          ];
          if (compareTypesWeaknesses(compArr, pokemonSortedArr)) {
            newList.push(item);
          }
        } else {
          // Check if type/weakness of pokemon includes all of the filter types/weaknesses
          const typeSuccess = filterType.every((type) =>
            item.type.includes(type)
          );
          const weaknessSuccess = filterWeakness.every((weakness) =>
            item.weaknesses.includes(weakness)
          );

          if (typeSuccess && weaknessSuccess) {
            newList.push(item);
          }
        }
      });
    } else {
      // Check for length in type array
      if (filterType.length) {
        // Create comparison array and sort alphabetically
        const compArr = [...filterType];
        compArr.sort();
        if (filterType.length > 1) {
          // "Strict" filter
          // See if pokemon.type contains ALL filterType filters
          pokemon.forEach((item) => {
            const sortedTypes = [...item.type];
            sortedTypes.sort();
            if (compareTypesWeaknesses(compArr, sortedTypes)) {
              newList.push(item);
            }
          });
        } else {
          // "Loose" filter
          // See if a filterType filter is included in pokemon.type
          pokemon.forEach((item) => {
            if (item.type.includes(filterType[0])) {
              newList.push(item);
            }
          });
        }
      }

      // Check for length in weaknesses array
      if (filterWeakness.length) {
        // Create comparison array and sort alphabetically
        const compArr = [...filterWeakness];
        compArr.sort();
        if (filterWeakness.length > 1) {
          // "Strict" filter
          // See if pokemon.weaknesses contains ALL filterWeakness filters
          pokemon.forEach((item) => {
            const sortedTypes = [...item.weaknesses];
            sortedTypes.sort();
            if (compareTypesWeaknesses(compArr, sortedTypes)) {
              newList.push(item);
            }
          });
        } else {
          // "Loose" filter
          // See if a filterWeakness filter is included in pokemon.weaknesses
          pokemon.forEach((item) => {
            if (item.weaknesses.includes(filterWeakness[0])) {
              newList.push(item);
            }
          });
        }
      }
    }

    // Set list of pokemon to be returned
    dispatch(setPokemonList(newList));
  };

  const handleClearFilter = () => {
    setFilterType([]);
    setFilterWeakness([]);
    dispatch(setPokemonList(pokemon));
    // Reset classList of "active" filter li's
    const filterOptions = document.querySelectorAll(".filter-li__option");
    const activeClass = "filter-li__option--active";

    for (const option of filterOptions) {
      if (option.classList.contains(activeClass)) {
        option.classList.remove(activeClass);
      }
    }
  };

  const handleHideFilter = () => {
    handleClearFilter();
    setShowAdvanced(false);
  };

  // Reset list to include all pokemon on unmount
  useEffect(() => {
    return () => {
      dispatch(setPokemonList(pokemon));
    };
  }, [dispatch, pokemon]);

  return !showAdvanced ? (
    <button
      onClick={() => setShowAdvanced(true)}
      className="form-advanced__controls-btn form-advanced__controls-btn--show"
    >
      Show Filter
    </button>
  ) : (
    <div className="form-advanced">
      <p className="form-advanced__instructions">T = Type | W = Weakness</p>
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
              onKeyUp={handleTypeKeyPress}
              role="button"
              tabIndex="0"
            >
              T
            </span>
            <span
              className="filter-li__option filter-li__weakness"
              name={type}
              onClick={handleWeaknessClick}
              onKeyUp={handleWeaknessKeyPress}
              role="button"
              tabIndex="0"
            >
              W
            </span>
          </li>
        ))}
      </ul>
      <div className="form-advanced__controls">
        <button
          className="form-advanced__controls-btn form-advanced__controls-btn--apply"
          onClick={handleApplyFilter}
        >
          Apply Filter
        </button>
        <button
          className="form-advanced__controls-btn form-advanced__controls-btn--clear"
          onClick={handleClearFilter}
        >
          Clear Filter
        </button>
        <button
          onClick={handleHideFilter}
          className="form-advanced__controls-btn form-advanced__controls-btn--close"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Filter;
