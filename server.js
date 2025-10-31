const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.get('/selectList', (req, res) => {
  const list = [];

  // Генерация списка
  for (let i = 1; i <= 1000; i++) {
    list.push({key: i.toString(), value: i.toString()});
  }
  res.status(200).json(list);
})

app.listen(port, () => {
  console.log(`Select app listening on port ${port}`)
})