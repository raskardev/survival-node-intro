const express = require('express');
const app = express();

const survivorsRouter = require('./domain/survivors/routes');
const weaponsRouter = require('./domain/weapons/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/survivors', survivorsRouter);
app.use('/weapons', weaponsRouter);

require('./db');

app.listen(1234, function(err) {
  if (err) {
    console.error(err);
    throw err;
  }

  console.log('Servidor funcionando en http://localhost:1234');
});
