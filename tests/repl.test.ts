import { describe, expect, test } from "vitest";
import { cleanInput } from "../src/repl.ts";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "  heLlO       world",
    expected: ["hello", "world"],
  },
  {
    input: "Neovim",
    expected: ["neovim"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);

    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
