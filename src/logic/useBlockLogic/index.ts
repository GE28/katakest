import { createSignal } from "solid-js";
import AnswerBlock from "@logic/AnswerBlock";

function useAnswerLogic() {
  const [selectedAnswers, setSelectedAnswers] = createSignal<AnswerBlock[]>([]);
  // because the mapped blocks at main screen are not reactive, we cannot use order as a block property
  const blockOrderMap = new Map<string, number>();

  const getCurrentAnswer = () => {
    return selectedAnswers().map((a) => a.getJPchar());
  };

  const getCurrentPlainAnswer = () => {
    return selectedAnswers()
      .map((a) => a.getRomaji())
      .join("");
  };

  const selectAnswer = (answer: AnswerBlock) => {
    if (blockOrderMap.has(answer.getId())) {
      deselectAnswer(answer);
    } else {
      setSelectedAnswers([...selectedAnswers(), answer]);
      blockOrderMap.set(answer.getId(), selectedAnswers().length + 1);
    }
  };

  const deselectAnswer = (answer: AnswerBlock) => {
    setSelectedAnswers(selectedAnswers().filter((a) => a !== answer));
    blockOrderMap.delete(answer.getId());
    setBlocksOrder();
  };

  const setBlocksOrder = () => {
    selectedAnswers().forEach((a, i) => {
      blockOrderMap.set(a.getId(), i + 1);
    });
  };

  const getBlockOrder = (block: AnswerBlock) => {
    return blockOrderMap.get(block.getId()) || 0;
  };

  return {
    getCurrentAnswer,
    getCurrentPlainAnswer,
    getBlockOrder,
    selectedAnswers,
    selectAnswer,
    deselectAnswer,
  };
}

export default useAnswerLogic;
