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
  const [displayingAnswer, setDisplayingAnswer] = createSignal(false);
  const [canSubmitAnswer, setCanSubmitAnswer] = createSignal(false);

  createEffect(() => {
    nextQuestion();
  });

  createEffect(() => {
    setCanSubmitAnswer(
      answerLogic().getCurrentAnswer().length === currentQuestion().length
    );
  }, [answerLogic]);

  createEffect(() => {
    const newBlockGenerator = useBlockGenerator(currentQuestion());
    setBlockGenerator(newBlockGenerator);
    setAnswerLogic(useAnswerLogic());
  }, [currentQuestion]);

  const handleAnswer = () => {
    try {
      if (displayingAnswer()) {
        nextQuestion();
        setDisplayingAnswer(false);
        return;
      }

      const result = answer(answerLogic().getCurrentAnswer());
      setDisplayingAnswer(true);
      console.log(result);
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
          value={answerLogic().getCurrentPlainAnswer()}
        />
        <div class={`right-answer ${displayingAnswer() ? "" : "hidden"}`}>
          {currentQuestion().map((char, index) => {
            const userAnswer = answerLogic().getCurrentAnswer();
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
              class={blockPropToState(answerLogic().getBlockOrder(block))}
              data-order={answerLogic().getBlockOrder(block)}
              onClick={() => {
                if (
                  !canSubmitAnswer() ||
                  answerLogic().getBlockOrder(block) > 0
                )
                  answerLogic().selectAnswer(block);
                setAnswerLogic({ ...answerLogic() }); // force the map to run again and update the order
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
        <button class="action-button stop-button">Parar</button>
      </div>
    </>
  );
}

export default MainScreen;
