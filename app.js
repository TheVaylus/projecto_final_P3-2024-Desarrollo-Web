const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Conexión a MongoDB Atlas
const mongoUri = 'mongodb+srv://jcesteba:FOC36GJBun9piJ8G@cluster0.lyibsku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// Definir el esquema y el modelo de usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });
  newUser.save()
    .then(() => res.redirect('/confirmation'))
    .catch(err => res.status(500).send('Error al registrar el usuario'));
});

app.get('/confirmation', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'confirmation.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
