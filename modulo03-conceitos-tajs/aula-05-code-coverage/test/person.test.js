import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { mapPerson } from "../src/person.js";

describe("Person Test Suite", () => {
  describe("Happy path", () => {
    it("Should map person", () => {
      const person = '{"name": "Ramon", "age":32}';
      const personObj = mapPerson(person);
      expect(personObj).toEqual({
        name: "Ramon",
        age: 32,
        createdAt: expect.any(String),
      });
    });
  });
  describe("what coverage doesnt tell you", () => {
    it("Should not map person given invalid JSON string", () => {
      const person = '{"name":';
      expect(() => mapPerson(person)).toThrow("Unexpected end of JSON input");
    });

    it("Should not map person given invalid JSON data", () => {
      const person = "{}";
      const personObj = mapPerson(person);
      expect(personObj).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(String),
      });
    });
  });
});
