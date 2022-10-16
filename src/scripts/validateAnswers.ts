import chalk from "chalk";
import { AnswerValidator } from "../answers/AnswerValidator";
import answerCombinations from "../answers/answers.json";
import eventAnswerCombinations from "../answers/event-answers.json";

const answers = [...answerCombinations, ...eventAnswerCombinations];

const answerValidator = new AnswerValidator(answers);

try {
  answerValidator.validateAll();

  console.log(
    chalk.green(`✅ Successfully validated ${answers.length} answers!`)
  );
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(chalk.red(e.message));
  }

  process.exit(1);
}
