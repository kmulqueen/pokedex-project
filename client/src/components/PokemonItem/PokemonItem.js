import "./style.css";
import { Link } from "react-router-dom";

const PokemonItem = ({ number, name, image }) => {
  return (
    <div className="pokemon-item">
      <Link to={`/pokemon/number/${number}`} className="pokemon-item__link">
        <h3 className="pokemon-item__title">
          {number} - {name}
        </h3>
        <img src={image} alt={name} className="pokemon-item__image" />
      </Link>
    </div>
  );
};

export default PokemonItem;
