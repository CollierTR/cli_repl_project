import type { State } from "../state.js";
import type { ShallowLocations } from "../classes/pokiApi.js";

export async function mapb(state: State): Promise<void> {
  const data: ShallowLocations = await state.pokiApi.fetchLocations(
    state.prevLocationsURL,
  );

  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }

  state.prevLocationsURL = data.previous;
  state.nextLocationsURL = state.prevLocationsURL;

  for (const location of data.results) {
    console.log(location.name);
  }
}
