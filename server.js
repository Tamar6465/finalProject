const { app } = require("./app");

const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
  console.log(`the server is running on port: ${PORT}`);
});
