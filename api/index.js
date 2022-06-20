const server = require("./src/app.js");
require("./src/db");

server.listen(process.env.PORT, () => {
  console.log("%s listening at 3001");
});
