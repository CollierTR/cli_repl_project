import { exit } from "./exit.js";
import { help } from "./help.js";
import type { CLICommand } from "../state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: exit,
    },
    help: {
      name: "help",
      description: "Displays the help page",
      callback: help,
    },
    // can add more commands here
  };
}
