const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected succesfully!`);
  })
  .catch((err) => {
    console.log(`Cannot connect to the database!`, err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome To Hayuah2nd API',
  });
});

require('./app/routes/post.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/cart.routes')(app);
require('./app/routes/sell.routes')(app);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
