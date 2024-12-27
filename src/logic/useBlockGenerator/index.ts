import { createSignal, createEffect } from "solid-js";
import JPchar from "@domain/JPchar";
import JPcharList from "@domain/HiraganaCharList";
import AnswerBlock from "@logic/AnswerBlock";
import shuffleArray from "@utils/shuffleArray";

function useBlockGenerator(currentQuestion: JPchar[]) {
  const [answerBlocks, setAnswerBlocks] = createSignal<AnswerBlock[]>([]);

  createEffect(() => {
    const allAnswers = [...currentQuestion];
    if (allAnswers.length === 0) return;
    // var
    while (allAnswers.length < 12) allAnswers.push(getRandomJPchar());
    setAnswerBlocks(shuffleArray(allAnswers).map((a) => new AnswerBlock(a)));
  });

  const getRandomJPchar = () => {
    const index = Math.floor(Math.random() * Object.keys(JPcharList).length);
    const kana = Object.keys(JPcharList)[index];
    const romaji = JPcharList[kana];
    return new JPchar(kana, romaji);
  };

  return {
    answerBlocks,
  };
}

export default useBlockGenerator;
