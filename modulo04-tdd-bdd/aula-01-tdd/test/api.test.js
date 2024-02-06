import { describe, expect, it, beforeAll, afterAll, jest } from "@jest/globals";
import { server } from "../src/api.js";
/*

- Deve cadastrar usuários e definir uma categoria onde:
  - Jovens Adultos:
    - Usuarios de 18-25
  - Adultos: 
    - Usuarios de 26-50
  - Idosos: 
    - Usuarios 51+
  - Menor:
    - Estoura um erro

*/

describe("API Users E2E Suite", () => {
  function waitForServerStatus(server) {
    return new Promise((resolve, reject) => {
      server.once("error", (err) => reject(err));
      server.once("listening", () => resolve());
    });
  }

  async function createUser(data) {
    return fetch(`${_testServerAddress}/users`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`);
    return user.json();
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

  it("should register a new use with young-adult category", async () => {
    const expectedCategory = "young-adult";
    jest.useFakeTimers({ now: new Date("2023-11-23T00:00") });
    const response = await createUser({
      name: "Ze das Couves",
      birthday: "2000-01-01", //21 anos
    });

    expect(response.status).toBe(201);
    const result = await response.json();
    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);
    expect(user.category).toBe(expectedCategory);
  });

  it("should register a new use with adult category", async () => {
    const expectedCategory = "adult";
    jest.useFakeTimers({ now: new Date("2023-11-23T00:00") });
    const response = await createUser({
      name: "Ze das Couves",
      birthday: "1990-01-01", //34 anos
    });

    expect(response.status).toBe(201);
    const result = await response.json();
    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);
    expect(user.category).toBe(expectedCategory);
  });

  it("should register a new use with senior category", async () => {
    const expectedCategory = "senior";
    jest.useFakeTimers({ now: new Date("2023-11-23T00:00") });
    const response = await createUser({
      name: "Ze das Couves",
      birthday: "1970-01-01", //54 anos
    });

    expect(response.status).toBe(201);
    const result = await response.json();
    expect(result.id).not.toBeUndefined();

    const user = await findUserById(result.id);
    expect(user.category).toBe(expectedCategory);
  });

  it("should throw a erron when registering a underage user", async () => {
    const response = await createUser({
      name: "Novin da silva",
      birthday: "2018-01-01",
    });

    expect(response.status).toBe(400);

    const result = await response.json();
    expect(result.message).toEqual("User must be 18yo or older");
  });

  it("should return hello world for unmapped routes", async () => {
    const response = await fetch(`${_testServerAddress}/anyroute`);
    const message = await response.text();
    expect(response.status).toBe(200);
    expect(message).toBe("Hello World!");
  });
});
