import { exit } from "./exit.js";
import { help } from "./help.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (args: string[], commands: Record<string, CLICommand>) => void;
};

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
