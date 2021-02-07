import "./style.css";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import AllPokemonView from "../../components/AllPokemonView";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Pokédex</h1>
      <SearchBar />
      <Filter />
      <AllPokemonView />
    </div>
  );
};

export default HomePage;
