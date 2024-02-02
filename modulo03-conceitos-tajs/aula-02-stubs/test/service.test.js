import { it, expect, describe, beforeEach, jest } from "@jest/globals";
import fs from "node:fs/promises";
import Service from "../src/service.js";

describe("Service test suite", () => {
  let _service;
  const filename = "testfile.ndjson";
  beforeEach(() => {
    _service = new Service({ filename });
  });

  describe("#read", () => {
    it("should throw error when file not exists", async () => {
      jest.spyOn(fs, "readFile").mockRejectedValue("file not exists");
      await expect(_service.read()).rejects.toBe("file not exists")
    });

    it("should return an empty array if the file is empty", async () => {
      jest.spyOn(fs, "readFile").mockResolvedValue("");

      const result = await _service.read();
      expect(result).toEqual([]);
    });

    it("should return users without password if file contains users", async () => {
      const dbData = [
        {
          username: "user1",
          password: "password1",
          createdAt: new Date().toISOString(),
        },
        {
          username: "user2",
          password: "password2",
          createdAt: new Date().toISOString(),
        },
      ];

      const fileContents = dbData
        .map((item) => JSON.stringify(item).concat("\n"))
        .join("");
      jest.spyOn(fs, "readFile").mockResolvedValue(fileContents);

      const result = await _service.read();

      const expectedResult = dbData.map(({ password, ...rest }) => rest);
      expect(result).toEqual(expectedResult);
    });
  });
});
