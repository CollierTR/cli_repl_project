import type { State } from "../state.js";
import type { ShallowLocations } from "../classes/pokiApi.js";

export async function map(state: State): Promise<void> {
  const data: ShallowLocations = await state.pokiApi.fetchLocations(
    state.nextLocationsURL,
  );

  state.prevLocationsURL = state.nextLocationsURL;
  state.nextLocationsURL = data.next;

  for (const location of data.results) {
    console.log(location.name);
  }
}
