import { createEffect, createSignal } from "solid-js";
import "./styles.css";
import useBlockGenerator from "@logic/useBlockGenerator";
import useAnswerLogic from "@logic/useAnswerLogic";
import useGame from "@logic/useGame";

const blockPropToState = (order: number) => {
  return "answer-block " + (order > 0 ? "selected" : "");
};

function MainScreen() {
  const { currentQuestion, nextQuestion, answer, formattedQuestion } =
    useGame();

  const [blockGenerator, setBlockGenerator] = createSignal(
    useBlockGenerator(currentQuestion())
  );
  const [answerLogic, setAnswerLogic] = createSignal(useAnswerLogic());

  createEffect(() => {
    nextQuestion();
  });

  createEffect(() => {
    const newBlockGenerator = useBlockGenerator(currentQuestion());
    setBlockGenerator(newBlockGenerator);
    setAnswerLogic(useAnswerLogic());
  }, [currentQuestion]);

  const handleAnswer = () => {
    try {
      const result = answer(answerLogic().getCurrentAnswer());
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 class="question-label">{formattedQuestion()}</h1>
      <hr />
      <input
        class="answer-input"
        type="text"
        disabled
        value={answerLogic().getCurrentPlainAnswer()}
      />
      <div class="answer-block-container">
        {blockGenerator()
          .answerBlocks()
          .map((block) => (
            <div
              class={blockPropToState(answerLogic().getBlockOrder(block))}
              data-order={answerLogic().getBlockOrder(block)}
              onClick={() => {
                answerLogic().selectAnswer(block);
                setAnswerLogic({ ...answerLogic() }); // force the map to run again and update the order
              }}
            >
              {block.getRomaji()}
            </div>
          ))}
      </div>
      <div class="action-input-container">
        <button class="action-button answer-button" onClick={handleAnswer}>
          Responder
        </button>
        <button class="action-button stop-button">Parar</button>
      </div>
    </>
  );
}

export default MainScreen;
