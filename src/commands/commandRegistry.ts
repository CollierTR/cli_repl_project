import { exit } from "./exit.js";
import { help } from "./help.js";
import { map } from "./map.js";
import { mapb } from "./mapb.js";
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
    map: {
      name: "map",
      description: "Displays 20 locations",
      callback: map,
    },
    mapb: {
      name: "mapb",
      description: "Displays 20 Previous locations",
      callback: mapb,
    },
    // can add more commands here
  };
}
