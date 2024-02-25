import { server } from "./api.js";

if (process.env.NODE_ENV !== "test") {
  server.listen(process.env.PORT || 3000, () => {
    const serverInfo = server.address();
    console.log(
      `server is running at ${serverInfo.address}:${serverInfo.port}`
    );
  });
}

export default server;
