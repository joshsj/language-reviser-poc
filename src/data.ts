import { Verb } from "./language.js";

type DataSet = readonly Verb[];

// TODO: replace with JSON ?
const getData = (): DataSet =>
  Object.freeze([
    {
      infinitive: "parler",
      forms: "regular",
    },
    {
      infinitive: "aller",
      forms: {
        present: {
          je: "vais",
          tu: "vas",
          il: "va",
          nous: "allons",
          vous: "allez",
          ils: "vont",
        },
      },
    },
    {
      infinitive: "être",
      forms: {
        present: {
          je: "suis",
          tu: "es",
          il: "est",
          nous: "sommes",
          vous: "êtes",
          ils: "sont",
        },
      },
    },
  ]);

export { getData, DataSet };
