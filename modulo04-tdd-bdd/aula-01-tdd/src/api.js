import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { createServer } from "node:http";

const usersDb = [];

function getUserCategory(birthday) {
  const age = new Date().getFullYear() - new Date(birthday).getFullYear();
  if (age < 18) throw new Error("User must be 18yo or older");
  if (age >= 18 && age <= 25) return "young-adult";
  if (age > 25 && age <= 50) return "adult";
  if (age > 50) return "senior";
}

const server = createServer(async (request, response) => {
  try {
    if (request.url === "/users" && request.method === "POST") {
      const user = JSON.parse(await once(request, "data"));
      const updatedUser = {
        ...user,
        id: randomUUID(),
        category: getUserCategory(user.birthday),
      };
      usersDb.push(updatedUser);
      response.writeHead(201, {
        "Content-Type": "application/json",
      });
      response.end(
        JSON.stringify({
          id: updatedUser.id,
        })
      );
      return;
    }
    if (request.url.startsWith("/users") && request.method === "GET") {
      const [, , id] = request.url.split("/");
      const user = usersDb.find((user) => user.id === id);

      response.end(JSON.stringify(user));
      return;
    }
    response.end("Hello World!");
  } catch (error) {
    if (error.message.includes("18yo")) {
      response.writeHead(400, {
        "Content-Type": "application/json",
      });
      response.end(JSON.stringify({ message: error.message }));
      return;
    }

    response.writeHead(500);
    response.end("deu ruim");
    return;
  }
});

export { server };
