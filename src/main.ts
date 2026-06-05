// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const State = initState();

  try {
    startREPL(State);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

main();
