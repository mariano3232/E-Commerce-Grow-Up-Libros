const server = require("./src/app.js");
require("./src/db");

server.listen(3001, () => {
  console.log("%s listening at 3001");
});
