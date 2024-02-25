import { describe, it, expect } from "@jest/globals";
import { fetchAPIBYPage } from "../src/runner.js";
import page01Fixture from "./fixtures/get-page01.json";
import page02Fixture from "./fixtures/get-page02.json";
import nock from "nock";

describe("Web Integration Test Suite", () => {
  it("should return the right object with the right properties", async () => {
    const scope = nock(`https://rickandmortyapi.com/api`)
      .get("/character/")
      .query({ page: 1 })
      .reply(200, page01Fixture);
    const page01 = await fetchAPIBYPage(1);

    expect(page01).toEqual([
      {
        id: 21,
        name: "Aqua Morty",
        image: "https://rickandmortyapi.com/api/character/avatar/21.jpeg",
      },
    ]);

    scope.done();
  });
});
