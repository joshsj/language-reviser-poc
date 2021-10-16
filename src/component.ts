type Challenge = {
  goal: string;
  pre?: string;
  post?: string;
  hint?: string;
};

type Result = "correct" | "skip" | "incorrect";

type Elements = {
  container: HTMLDivElement;
  preEl: HTMLLabelElement;
  inputEl: HTMLInputElement;
  postEl: HTMLLabelElement;
};

const GoalAttribute = "goal";

const el = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  id?: string
): HTMLElementTagNameMap[K] => {
  const el = document.createElement(tagName);
  id && (el.id = id);
  return el;
};

const updateLabel = (label: HTMLLabelElement, text?: string) => {
  const [innerText, attr] = text ? [text, "false"] : ["", "true"];
  label.innerText = innerText;
  label.setAttribute("aria-hidden", attr);
};

const createElements = (): Elements => {
  const inputElId = "challenge-input";
  const inputEl = el("input", inputElId);
  inputEl.setAttribute("spellcheck", "false");

  const preEl = el("label");
  const postEl = el("label");
  preEl.setAttribute("for", inputElId);
  postEl.setAttribute("for", inputElId);

  const container = el("div");
  container.appendChild(preEl);
  container.appendChild(inputEl);
  container.appendChild(postEl);
  container.classList.add("challenge");

  return { container, preEl, inputEl, postEl };
};

const bindChallenge = (component: Elements, challenge: Challenge) => {
  component.inputEl.setAttribute(GoalAttribute, challenge.goal);

  challenge.hint && (component.inputEl.placeholder = challenge.hint);

  component.inputEl.style.width =
    (challenge.hint
      ? Math.max(challenge.goal.length, challenge.hint.length)
      : challenge.goal.length) + "ch";

  updateLabel(component.preEl, challenge.pre);
  updateLabel(component.postEl, challenge.post);
};

const indicate = (component: Elements, indication: "good" | "bad") => {
  component.container.classList.add(indication);
  setTimeout(() => component.container.classList.remove(indication), 250);
};

const createChallengeComponent = (
  answerComparer: (attempt: string, actual: string) => Result,
  onNeedChallenge: () => Challenge
) => {
  const component = createElements();
  const refresh = () => bindChallenge(component, onNeedChallenge());

  component.inputEl.addEventListener("keydown", ({ key }) => {
    if (key !== "Enter") {
      return;
    }

    const result = answerComparer(
      component.inputEl.value,
      component.inputEl.getAttribute(GoalAttribute)!
    );

    indicate(component, result === "correct" ? "good" : "bad");

    if (result !== "incorrect") {
      component.inputEl.value = "";
      refresh();
    }
  });

  refresh();

  return component.container;
};

export { createChallengeComponent, Challenge, Result };
