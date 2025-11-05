const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

// Получение списка опций
app.get('/options/for/select', (req, res) => {
  const list = [];

  // Генерация списка
  for (let i = 1; i <= 1000; i++) {
    list.push({name: i.toString(), value: i.toString()});
  }
  res.set('Cache-Control', 'no-cache');
  res.status(200).json(list);
})

// Сохранение опции
app.post('/selected/option', (req, res) => {
  res.status(200).json({
    message: `Выбранная опция ${req.body.value} успешно принята.`
  });

  // Отправка ошибки для тестов
  // res.status(500).json({message: "Server not available! Try later."});
})

app.listen(port, () => {
  console.log(`Select app listening on port ${port}`)
})