import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";

function App() {
  return (
    <Switch>
      <Route
        path="/pokemon/number/:number"
        exact
        component={PokemonDetailsPage}
      />
      <Route path="/" exact component={HomePage} />
    </Switch>
  );
}

export default App;
