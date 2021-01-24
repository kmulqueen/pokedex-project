import { Switch, Route } from "react-router-dom";
import AllPokemonView from "./components/AllPokemonView";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={AllPokemonView} />
    </Switch>
  );
}

export default App;
