import lokijs from "lokijs";
import { randomUUID } from "node:crypto";

export default class Service {
  #heroesTable;
  constructor(dbName) {
    const db = new lokijs(dbName);
    this.#heroesTable = db.addCollection("characters");
  }

  createHero(hero) {
    const items = this.#heroesTable.insert({ ...hero, id: randomUUID() });

    return items;
  }
  listHeroes() {
    return this.#heroesTable.find();
  }
}
