import { createInterface } from "node:readline";
import { getCommands } from "./commands/commandRegistry.js";
import type { State } from "./state.ts";

export function cleanInput(input: string): string[] {
  const splitWords = input.trim().toLowerCase().split(" ");
  const filtered = splitWords.filter((word) => word != "");
  return filtered;
}

export function startREPL(State: State): void {
  const commands = getCommands();

  State.rl.prompt();
  State.rl.on("line", async (input: string) => {
    const cleanedInput = cleanInput(input);
    if (cleanedInput.length === 0) {
      State.rl.prompt();
    } else {
      if (commands[cleanedInput[0]]) {
        try {
          await commands[cleanedInput[0]].callback(State);
        } catch (e) {
          console.log(`Error: ${e}`);
        }
      } else {
        console.log("Unknown command");
      }

      State.rl.prompt();
    }
  });
}
