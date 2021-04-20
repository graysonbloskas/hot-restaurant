const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT||3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)

const tables = [
  {
    routeName: 'table1',
    id: 2000,
    name: 'Arecio',
    phone: 123-456-789,
    email: "arecio@gmail.com",
  },
  {
    routeName: 'table2',
    id: 1200,
    name: 'Thalia',
    phone: 123-456-789,
    email: "thalia@gmail.com",
  },
  {
    routeName: 'table3',
    id: 1200,
    name: 'Nico',
    phone: 123-456-789,
    email: "nico@gmail.com",
  },
  {
    routeName: 'table4',
    id: 1200,
    name: 'Grayson',
    phone: 123-456-789,
    email: "grayson@gmail.com",
  },
  {
    routeName: 'table5',
    id: 1200,
    name: 'Danny',
    phone: 123-456-789,
    email: "danny@gmail.com",
  },
  
];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'main.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

// Displays all characters
app.get('/api/tables', (req, res) => res.json(tables));

// Displays a single character, or returns false
app.get('/api/tables/:table', (req, res) => {
  const chosen = req.params.tables;

  console.log(chosen);

  /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

   for (let i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

app.post('/api/tables', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.routeName = newTable.name.replace(/\s+/g, '').toLowerCase();
  console.log(newTable);

  tables.push(newTable);
  res.json(newTable);
});




app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));