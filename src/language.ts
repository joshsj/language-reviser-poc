const Subjects = ["je", "tu", "il", "nous", "vous", "ils"] as const;
type Subject = typeof Subjects[number];

const Tenses = ["present"];
type Tense = typeof Tenses[number];

type IrregularVerb = { [K in Subject]: string };

type Verb = {
  infinitive: string;
  forms: "regular" | { [K in Tense]: IrregularVerb };
};

// type Conjugator = (
//   _subject: Subject,
//   _tense: Tense,
//   _infinitive: string
// ) => string;

type RegularVerbEnding = "er" | "ir" | "re";

type Conjugators = {
  [K in RegularVerbEnding]: (
    _subject: Subject,
    _tense: Tense,
    _infinitive: string
  ) => string;
};

const conjugators: Conjugators = {
  er: () => "todo",
  ir: () => "todo",
  re: () => "todo",
};

// TODO: have a guess
const conjugate = (_subject: Subject, _tense: Tense, _infinitive: string) =>
  conjugators[_infinitive.slice(-2) as RegularVerbEnding](
    _subject,
    _tense,
    _infinitive
  );

export { Subject, Subjects, Tense, Tenses, Verb, conjugate };
