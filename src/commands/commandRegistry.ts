import { exit } from "./exit.js";
import { help } from "./help.js";
import { map } from "./map.js";
import { mapb } from "./mapb.js";
import { explore } from "./explore.js";
import { catchPokemon } from "./catch.js";
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
    explore: {
      name: "explore",
      description: "Shows the Pokemon in the given location",
      callback: explore,
    },
    catch: {
      name: "catch",
      description: "attempt to catch a pokemon",
      callback: catchPokemon,
    },
    // can add more commands here
  };
}
