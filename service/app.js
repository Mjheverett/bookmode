const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const db = require('./models');
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize.sync({ alter: true })

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  "Access-Control-Allow-Origin": '*',
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static("./public"));

require('dotenv').config();

require("./routes/book.routes")(app);
require("./routes/group.routes")(app);
require("./routes/recommendation.routes")(app);
require("./routes/shelf.routes")(app);
require("./routes/user.routes")(app);
require("./routes/recommendation.routes")(app)
require("./routes/proxy.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

console.log(process.env.API_URL)

module.exports = app;
