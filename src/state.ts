import { Readline } from "node:readline/promises";
import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands/commandRegistry.js";
import { PokeAPI, type Pokemon } from "./classes/pokiApi.js";

export type State = {
  commands: Record<string, CLICommand>;
  pokedex: Record<string, Pokemon>;
  rl: Interface;
  pokiApi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState() {
  const commands = getCommands();

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex >",
  });

  const pokiApi = new PokeAPI();

  return {
    commands: commands,
    pokedex: {},
    rl: rl,
    pokiApi: pokiApi,
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}
