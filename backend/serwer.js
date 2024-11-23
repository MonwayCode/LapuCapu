const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const animalRoutes = require('./routes/animalRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const eventRoutes = require('./routes/eventRoutes');

const createAnimalsTable = require("./migrations/create_animals_table");
const createCategoriesTable = require("./migrations/create_categories_table");
const createUsersTable = require('./migrations/create_users_table');
const createEventsTable = require('./migrations/create_events_table');

createCategoriesTable();
createUsersTable();
createAnimalsTable();
createEventsTable();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/eventImage', express.static(path.join(__dirname, 'eventImage')));
app.use('/animalImage', express.static(path.join(__dirname, 'animalImage')));

app.use('/users', userRoutes); 
app.use('/animals', animalRoutes);
app.use('/categories', categoryRoutes);
app.use('/events', eventRoutes);


app.listen(8001, () => {
    console.log(`Server is running on http://localhost:8001`);
});

