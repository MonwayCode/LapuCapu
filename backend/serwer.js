const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(8001, () => {
    console.log(`Server is running on http://localhost:8001`);
});


let animals = [];
let categories = [];




app.post('/api/animals', (req, res) => {
    const { name, species, age, description, category, caretakerName, caretakerContact } = req.body;


    const newAnimal = {
        id: animals.length + 1,  // Generujemy ID na podstawie długości tablicy
        name,
        species,
        age,
        description,
        category,
        caretakerName,
        caretakerContact,
      };

    animals.push(newAnimal);


    
  // Zwracamy odpowiedź z dodanym zwierzakiem
  res.status(201).json(newAnimal);
});

app.get('/api/animals/:id', (req, res) => {
        
  const animalId = parseInt(req.params.id); // Pobieramy ID zwierzaka z URL i przekształcamy je na liczbę
  const animal = animals.find((animal) => animal.id === animalId); // Szukamy zwierzaka w tablicy animals
  
  if (animal) {
    res.json(animal); // Jeśli zwierzak znaleziony, zwróć go w odpowiedzi
  } else {
    res.status(404).json({ message: 'Zwierzak nie znaleziony' }); // Jeśli nie znaleziono zwierzaka, zwróć 404
  }
});


app.post('/api/categories', (req, res) => {
  const { name, description } = req.body;

  const newCategory = {
    id: categories.length + 1,
    name,
    description
  };

  categories.push(newCategory);

  res.status(201).json(newCategory);
});


app.get('/api/categories/:id', (req, res) => {
        
  const categoryId = parseInt(req.params.id);
  const category = categories.find((category) => category.id === categoryId);
  
  if (category) {
    res.json(category); // Jeśli zwierzak znaleziony, zwróć go w odpowiedzi
  } 
  else {
    res.status(404).json({ message: 'Nie odnaleziono podanej kategorii' });
  }
});