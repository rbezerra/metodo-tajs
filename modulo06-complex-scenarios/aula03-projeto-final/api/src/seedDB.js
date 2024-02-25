import { Person } from "./model.js";
import { faker } from "@faker-js/faker";

const limit = process.argv[2] ? process.argv[2] : 10;
seed(limit);

async function seed(limit = 10) {
  await Person.sync({ force: true });
  for (let i = 0; i < limit; i++) {
    const data = {
      id: i + 1,
      name: faker.person.fullName(),
      age: faker.number.int(18, 100),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      vehicle: faker.vehicle.model(),
    };

    await Person.create(data);
  }
}
