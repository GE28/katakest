/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import MainScreen from "@components/MainScreen";
import ResultsScreen from "@components/ResultsScreen";

const root = document.getElementById("root");

function App() {
  return (
    <>
      <MainScreen />
    </>
  );
}

render(() => <App />, root!);
