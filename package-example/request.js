const axios = require("axios").default;

axios
  .get("https://www.wikipedia.com")
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
