import { getData } from "./data.js";
import { createChallengeComponent } from "./component.js";
import { answerComparer, getRandomChallenge } from "./game.js";

const main = async () => {
  const data = getData();

  const component = createChallengeComponent(answerComparer, () =>
    getRandomChallenge(data)
  );

  document.getElementById("app")!.appendChild(component);
};

main();
