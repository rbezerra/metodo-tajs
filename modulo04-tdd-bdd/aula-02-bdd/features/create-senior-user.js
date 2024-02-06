import { BeforeStep, Then, When} from "@cucumber/cucumber";
import assert from "node:assert";

let _testServerAddress;
let _context = {};
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

BeforeStep(function () {
  _testServerAddress = this.testServerAddress;
});

When(
  `I create a new user with the following details 3:`,
  async function (dataTable) {
    const [data] = dataTable.hashes();
    const response = await createUser(data);
    assert.strictEqual(response.status, 201);
    _context.userData = await response.json();
    assert.ok(_context.userData.id);
  }
);

Then(`I request the API with the user's ID 3`, async function () {
  const user = await findUserById(_context.userData.id);
  _context.createdUserData = user;
});

Then(
  `I should receive a JSON response with the user's details 3`,
  async function () {
    const expectedKeys = ["name", "birthDay", "id", "category"];
    assert.deepStrictEqual(
      Object.keys(_context.createdUserData).sort(),
      expectedKeys.sort()
    );
  }
);

Then(`the user should be categorized as a "Senior"`, async function () {
  assert.strictEqual(_context.createdUserData.category, "Senior");
});


When('I request the user with ID "3"', async function() {
  const user = await findUserById(_context.userData.id);
  _context.createdUserData = user;
})

Then(`the user's category should be "Senior"`, async function(){
  assert.strictEqual(_context.createdUserData.category, "Senior");
})
