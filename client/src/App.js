import { Switch, Route } from "react-router-dom";
import AllPokemonView from "./components/AllPokemonView";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";

function App() {
  return (
    <Switch>
      <Route
        path="/pokemon/number/:number"
        exact
        component={PokemonDetailsPage}
      />
      <Route path="/" exact component={AllPokemonView} />
    </Switch>
  );
}

export default App;
