import { Readline } from "node:readline/promises";
import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands/commandRegistry.js";
import { PokeAPI } from "./classes/pokiApi.js";

export type State = {
  commands: Record<string, CLICommand>;
  rl: Interface;
  pokiApi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
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
    rl: rl,
    pokiApi: pokiApi,
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}
