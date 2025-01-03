import { createSignal, createEffect } from "solid-js";
import Result from "@domain/Result";
import JPchar from "@domain/JPchar";
import { JPword } from "@domain/types/JPword";
import JPcharList from "@domain/HiraganaCharList";

function useGame() {
  const [results, setResults] = createSignal<Result>(new Result(0, 0));
  const [groupResults, setGroupResults] = createSignal<{
    [key: string]: Result;
  }>({});
  const [currentQuestion, setCurrentQuestion] = createSignal<JPword>([]);

  // var
  const DIFFICULTY = 4;

  const getJPchar = () => {
    const index = Math.floor(Math.random() * Object.keys(JPcharList).length);
    const kana = Object.keys(JPcharList)[index];
    const romaji: string | any = JPcharList[kana];
    return new JPchar(kana, romaji);
  };

  const nextQuestion = () => {
    const question: JPword = [];
    for (let i = 0; i < DIFFICULTY; i++) {
      question.push(getJPchar());
    }
    setCurrentQuestion(question);
  };

  const formattedQuestion = () => {
    return currentQuestion()
      .map((char) => char.getKana())
      .join("");
  };

  const compareAnswers = (answer: JPword, question: JPword) => {
    const hitsMap: { [key: string]: Result } = {};

    question.forEach((q) => {
      hitsMap[q.getRomaji()] = new Result(0, 0);
    });

    question.forEach((q, index) => {
      const left = answer[index].getRomaji();
      const right = q.getRomaji();
      const point = Number(left === right);
      hitsMap[right] = Result.getModified(hitsMap[right], point, 1 - point);
    });

    const score = Object.values(hitsMap).reduce(
      (acc, result) => acc + result.getHits(),
      0
    );

    return { score, hitsMap };
  };

  const answer = (answer: JPword) => {
    if (currentQuestion().length !== answer.length)
      throw new Error("Answer length does not match question length");

    const score = compareAnswers(answer, currentQuestion()).score;
    const point = Number(score === currentQuestion().length);
    setResults((r) => Result.getModified(r, point, 1 - point));

    const groupedHitsMap = compareAnswers(answer, currentQuestion()).hitsMap;
    setGroupResults((gr) =>
      Object.keys(groupedHitsMap).reduce((acc, key) => {
        if (key in acc)
          acc[key] = Result.getModified(
            acc[key],
            groupedHitsMap[key].getHits(),
            groupedHitsMap[key].getMisses()
          );
        else acc[key] = groupedHitsMap[key];
        return acc;
      }, gr)
    );

    return groupedHitsMap;
  };

  const resetGame = () => {
    setResults(new Result(0, 0));
    setGroupResults({});
    nextQuestion();
  };

  createEffect(() => {
    console.log(results());
    console.log(groupResults());
  });

  return {
    results,
    groupResults,
    currentQuestion,
    nextQuestion,
    answer,
    formattedQuestion,
    resetGame,
  };
}

export default useGame;
