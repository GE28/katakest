import { createEffect, createSignal } from "solid-js";
import "./styles.css";
import useBlockGenerator from "@logic/useBlockGenerator";
import useBlockLogic from "@logic/useBlockLogic";
import useLinkToURL from "@infra/useLinkToURL";
import { useGameContext } from "@context/GameContext";

const blockPropToState = (order: number) => {
  return "answer-block " + (order > 0 ? "selected" : "");
};

function MainScreen() {
  const { currentQuestion, nextQuestion, answer, formattedQuestion } =
    useGameContext()!;
  const navigate = useLinkToURL();

  const [blockGenerator, setBlockGenerator] = createSignal(
    useBlockGenerator(currentQuestion())
  );
  const [blockLogic, setBlockLogic] = createSignal(useBlockLogic());
  const [displayingAnswer, setDisplayingAnswer] = createSignal(false);
  const [canSubmitAnswer, setCanSubmitAnswer] = createSignal(false);

  createEffect(() => {
    nextQuestion();
  });

  createEffect(() => {
    setCanSubmitAnswer(
      blockLogic().getCurrentAnswer().length === currentQuestion().length
    );
  }, [blockLogic]);

  createEffect(() => {
    const newBlockGenerator = useBlockGenerator(currentQuestion());
    setBlockGenerator(newBlockGenerator);
    setBlockLogic(useBlockLogic());
  }, [currentQuestion]);

  const handleAnswer = () => {
    try {
      if (displayingAnswer()) {
        nextQuestion();
        setDisplayingAnswer(false);
        return;
      }

      answer(blockLogic().getCurrentAnswer());
      setDisplayingAnswer(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 class="question-label">{formattedQuestion()}</h1>
      <hr />
      <div class="answer-feedback-container">
        <input
          class="answer-input"
          type="text"
          disabled
          value={blockLogic().getCurrentPlainAnswer()}
        />
        <div class={`right-answer ${displayingAnswer() ? "" : "hidden"}`}>
          {currentQuestion().map((char, index) => {
            const userAnswer = blockLogic().getCurrentAnswer();
            const isCorrect =
              userAnswer[index] && char.compare(userAnswer[index]);
            const className = isCorrect ? "correct-answer" : "wrong-answer";
            return (
              <span class={`shown-answer ${className}`}>
                {char.getRomaji()}
              </span>
            );
          })}
        </div>
      </div>
      <div class="answer-block-container">
        {blockGenerator()
          .answerBlocks()
          .map((block) => (
            <div
              class={blockPropToState(blockLogic().getBlockOrder(block))}
              data-order={blockLogic().getBlockOrder(block)}
              onClick={() => {
                if (!canSubmitAnswer() || blockLogic().getBlockOrder(block) > 0)
                  blockLogic().selectAnswer(block);
                setBlockLogic({ ...blockLogic() }); // force the map to run again and update the order
              }}
            >
              {block.getRomaji()}
            </div>
          ))}
      </div>
      <div class="action-input-container">
        <button
          class="action-button answer-button"
          onClick={handleAnswer}
          disabled={!canSubmitAnswer()}
        >
          {displayingAnswer() ? "Próxima" : "Responder"}
        </button>
        <button
          class="action-button stop-button"
          onclick={() => navigate("/results")}
        >
          Parar
        </button>
      </div>
    </>
  );
}

export default MainScreen;
