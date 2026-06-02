import { createInterface } from "node:readline";
import { getCommands } from "./commands/commandRegistry.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex >",
});

export function cleanInput(input: string): string[] {
  const splitWords = input.trim().toLowerCase().split(" ");
  const filtered = splitWords.filter((word) => word != "");
  return filtered;
}

export function startREPL(): void {
  const commands = getCommands();

  rl.prompt();
  rl.on("line", (input: string) => {
    const cleanedInput = cleanInput(input);
    if (cleanedInput.length === 0) {
      rl.prompt();
    } else {
      if (commands[cleanedInput[0]]) {
        try {
          commands[cleanedInput[0]].callback(cleanedInput.slice(1), commands);
        } catch (e) {
          console.log(`Error: ${e}`);
        }
      } else {
        console.log("Unknown command");
      }

      rl.prompt();
    }
  });
}
