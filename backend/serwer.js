const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const animalRoutes = require('./routes/animalRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const createAnimalsTable = require("./migrations/create_animals_table");
const createCategoriesTable = require("./migrations/create_categories_table");
const createUsersTable = require('./migrations/create_users_table');

createCategoriesTable();
createUsersTable();
createAnimalsTable();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes); 
app.use('/api/animals', animalRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(8001, () => {
    console.log(`Server is running on http://localhost:8001`);
});

