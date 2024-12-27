import { createSignal, createEffect } from "solid-js";
import "./styles.css";
import useLinkToURL from "@infra/useLinkToURL";
import { useGameContext } from "@context/GameContext";

function ResultsScreen() {
  const { results, groupResults, resetGame } = useGameContext()!;
  const [totalHits, setTotalHits] = createSignal(0);
  const [totalMisses, setTotalMisses] = createSignal(0);
  const linkToURL = useLinkToURL();

  createEffect(() => {
    const totalHits = results().getHits();
    const totalMisses = results().getMisses();
    setTotalHits(totalHits);
    setTotalMisses(totalMisses);
  });

  return (
    <>
      <h1 class="result-label">Resumo</h1>
      <div class="results-container total-results">
        <div class="result-block">
          <span class="result-title">Acertos:</span>
          <span class="result-value positive">{totalHits()}</span>
        </div>
        <div class="result-block">
          <span class="result-title">Erros:</span>
          <span class="result-value negative">{totalMisses()}</span>
        </div>
      </div>
      <hr />
      <h1 class="result-label">Por grupos</h1>
      <div class="results-container">
        {Object.entries(groupResults()).map(([group, result]) => (
          <div class="result-block">
            <span class="result-title result-group">{group}:</span>
            <div class="result-value result-container">
              <span class="result-value positive">{result.getHits()}</span>
              <span class="result-value">/</span>
              <span class="result-value negative">{result.getMisses()}</span>
            </div>
          </div>
        ))}
      </div>
      <div class="action-input-container">
        <div class="action-input-container">
          <button
            class="action-button reset-button"
            onclick={() => {
              resetGame();
              linkToURL("/");
            }}
          >
            Reiniciar
          </button>
        </div>
        <div class="action-input-container">
          <button
            class="action-button back-button"
            onclick={() => linkToURL("/")}
          >
            Voltar
          </button>
        </div>
      </div>
    </>
  );
}

export default ResultsScreen;
