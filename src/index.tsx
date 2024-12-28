/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import MainScreen from "@components/pages/MainScreen";
import ResultsScreen from "@components/pages/ResultsScreen";
import { GameProvider } from "@context/GameContext";

const root = document.getElementById("root");

function App() {
  return (
    <GameProvider>
      <Router>
        <Route path="/" component={MainScreen} />
        <Route path="/results" component={ResultsScreen} />
      </Router>
    </GameProvider>
  );
}

render(() => <App />, root!);
