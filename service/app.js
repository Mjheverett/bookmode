const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const db = require('./models');
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

<<<<<<< HEAD
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupsRouter = require('./routes/groups');

var app = express();

app.use(cors());
=======
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
>>>>>>> a7e05d94b26f7ef8c42894a557d7a4dcb6d9685b
app.use(logger('dev'));
app.use(express.static("./public"));

require("./routes/shelf.routes")(app);
require("./routes/book.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;
