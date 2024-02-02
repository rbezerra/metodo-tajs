import { it, expect, describe, beforeEach, jest } from "@jest/globals";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import Service from "../src/service.js";

describe("Service test suite", () => {
  let _service;
  const filename = "testfile.ndjson";
  const MOCKED_HASHED_PWD = "hashedpassword";

  describe("#create - spies", () => {
    beforeEach(() => {
      jest.spyOn(crypto, crypto.createHash.name).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASHED_PWD),
      });

      jest.spyOn(fs, fs.appendFile.name).mockResolvedValue();

      _service = new Service({ filename });
    });

    it("should call appedFile with right params", async () => {
      const expectedCreatedAt = new Date().toISOString();
      jest
        .spyOn(Date.prototype, Date.prototype.toISOString.name)
        .mockReturnValue(expectedCreatedAt);

      const input = {
        username: "user1",
        password: "password1",
      };

      await _service.create(input);

      expect(crypto.createHash).toHaveBeenCalledWith("sha256");

      const hash = crypto.createHash("sha256");
      expect(hash.update).toHaveBeenCalledWith(input.password);
      expect(hash.digest).toHaveBeenCalledWith("hex");

      const expected = JSON.stringify({
        ...input,
        createdAt: expectedCreatedAt,
        password: MOCKED_HASHED_PWD,
      }).concat("\n");

      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected);
    });
  });
});
