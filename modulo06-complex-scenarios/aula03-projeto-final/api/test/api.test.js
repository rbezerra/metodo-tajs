import {
  it,
  expect,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
} from "@jest/globals";
import { server } from "../src/api.js";
import { randomUUID } from "node:crypto";
describe("API Persons E2E Suite", () => {
  function waitForServerStatus(server) {
    return new Promise((resolve, reject) => {
      server.once("error", (err) => reject(err));
      server.once("listening", () => resolve());
    });
  }

  function readChunks(reader) {
    return {
      async *[Symbol.asyncIterator]() {
        let readResult = await reader.read();
        while (!readResult.done) {
          yield readResult.value;
          readResult = await reader.read();
        }
      },
    };
  }

  async function* listPersons() {
    const persons = [];
    const response = await fetch(`${_testServerAddress}`);
    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();
    const data = await readChunks(reader);

    for await (const chunk of readChunks(reader)) {
      const item = JSON.parse(chunk);
      yield item;
    }
  }

  async function sentOptionsRequest() {
    const response = await fetch(`${_testServerAddress}`, {
      method: "OPTIONS",
    });
    return response;
  }

  async function sentAnalyticsRequest() {
    const response = await fetch(`${_testServerAddress}/analytics`, {
      method: "POST",
      body: JSON.stringify({
        appId: "web:dcce13f3-3e34-4854-a26f-32865ec1c6e7",
        tag: "init-started",
        at: 1708826739796,
      }),
    });
    return response;
  }

  let _testServer;
  let _testServerAddress;

  beforeAll(async () => {
    _testServer = server.listen();
    await waitForServerStatus(_testServer);
    const serverInfo = _testServer.address();
    _testServerAddress = `http://localhost:${serverInfo.port}`;
  });

  afterAll((done) => {
    server.closeAllConnections();
    _testServer.close(done);
  });

  it("should return a list of 10 persons", async () => {
    const persons = [];
    for await (const item of listPersons()) {
      persons.push(item);
    }

    expect(persons.length).toBe(10);
  });

  it("should respond on OPTIONS method", async () => {
    const response = await sentOptionsRequest();
    expect(response.status).toBe(200);
  });

  it("should respond on analytics route", async () => {
    const response = await sentAnalyticsRequest();
    expect(response.status).toBe(200);
  });
});
