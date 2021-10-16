import { Result, Challenge } from "./component.js";
import { DataSet } from "./data.js";
import { arrayRandom } from "./utils.js";
import { Subjects, Tenses, conjugate } from "./language.js";

const getRandomChallenge = (data: DataSet): Challenge => {
  const subject = arrayRandom(Subjects);
  const tense = arrayRandom(Tenses);
  const { infinitive, forms } = arrayRandom(data);

  const goal =
    forms === "regular"
      ? conjugate(subject, tense, infinitive)
      : forms[tense][subject];

  return { pre: subject, goal, hint: infinitive };
};

const answerComparer = (attempt: string, actual: string): Result => {
  if (attempt === "skip") {
    return "skip";
  }

  if (!actual.localeCompare(attempt, undefined, { sensitivity: "accent" })) {
    return "correct";
  }

  return "incorrect";
};

export { getRandomChallenge, answerComparer };
