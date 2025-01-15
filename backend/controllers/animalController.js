const db = require('../config/database');

const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "animalImage/"); // Folder docelowy dla przesłanych plików
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unikalna nazwa pliku
  },
});

const upload = multer({ storage }).single("image");

exports.addAnimal = (req, res) => {
    upload(req, res, (err) => {
        if (err) 
        {
          return res.status(500).json;
        }
        const { name, age, description, categoryId, caretakerId } = req.body;
        const imageURL = req.file ? req.file.filename : null; // Ścieżka do przesłanego pliku obrazu

        const sql = `
            INSERT INTO animals (name, age, description, imageURL, categoryId, caretakerId)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [name, age, description, imageURL, categoryId, caretakerId];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to add animal' });
            }

            res.status(201).json({
                animalId: result.insertId,
                name,
                age,
                description,
                imageURL,
                categoryId,
                caretakerId,
            });
        });
    });
};

exports.getAnimalById = (req, res) => {
    const { animalId } = req.params;

    const sql = 'SELECT * FROM animals WHERE animalId = ?';
    db.query(sql, [animalId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve animal' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.json(results[0]);
    });
};

exports.getAllAnimals = (req, res) => {
    const sql = 'SELECT * FROM animals';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve animals' });
        }

        res.status(200).json(results);
    });
};

exports.getAllAnimalsWithCaretaker = (req, res) => {
    const sql = `
        SELECT 
            a.animalId,
            a.name,
            a.age,
            a.description,
            a.imageURL,
            a.categoryId,
            a.caretakerId,
            u.name AS caretakerName,
            u.surname AS caretakerSurname,
            u.email AS caretakerEmail,
            u.phone AS caretakerPhone
        FROM animals a
        LEFT JOIN users u ON a.caretakerId = u.userId
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve animals' });
        }

        res.status(200).json(results);
    });
};

exports.deleteAnimalImages = (req, res) => {
    const { animalId } = req.params;
    const ds = `SELECT imageURL FROM animals WHERE animalId = ?`;  // Pobieranie nazwy obrazka by go usunąć z folderu

    db.query(ds, [animalId], (err, results) => {
        if (err) 
        {
          console.error("Błąd przy pobieraniu obrazu:", err);
          return res.status(500).json({ error: "Błąd przy pobieraniu obrazu" });
        }
    
        if (!results.length) 
        {
          console.error("Nie znaleziono zwierzęcia z podanym animalId");
          return res.status(404).json({ error: "Nie znaleziono zwierzęcia" });
        }
        
        const imageURL = results[0].imageURL; // Pobranie nazwy pliku obrazu (jeśli istnieje)
        if (imageURL) 
        {
            const filePath = path.join(__dirname, "../animalImage", imageURL);
    
            fs.unlink(filePath, (error) => {
            if (error) 
            {
                console.error("Błąd przy usuwaniu pliku:", error);
                return res.status(500).json({ error: "Błąd przy usuwaniu pliku" });
            }
            console.log("Plik został pomyślnie usunięty:", filePath);
            removeAnimal(animalId, res); // Usunięcie zwierzęcia z bazy danych
        });
        } 
        else 
        {
          // Jeśli nie ma obrazka, tylko usuń zwierzę z bazy
          removeAnimal(animalId, res);
        }
    });
};    

const removeAnimal = (animalId, res) => {
    const sql = 'DELETE FROM animals WHERE animalId = ?';  
    db.query(sql, [animalId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Failed to delete an animal'});
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({message: 'Zwierzę nie zostało znalezione.'});
        }

        res.status(200).json({message: 'Zwierzę zostało pomyślnie usunięte!'});
    });
}

exports.updateAnimal = (req, res) => {
    const { animalId } = req.params;
    const { name, age, description, categoryId, caretakerId } = req.body;
    
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error uploading image' });
        }

        const imageURL = req.file ? req.file.filename : null; // Jeśli jest nowy plik, przypisz jego nazwę

        // Jeśli nie ma nowego obrazu, nie zmieniamy ścieżki do obrazu
        const sql = `
            UPDATE animals
            SET 
                name = ?, 
                age = ?, 
                description = ?, 
                ${imageURL ? 'imageURL = ?, ' : ''} 
                categoryId = ?, 
                caretakerId = ?
            WHERE animalId = ?
        `;
        
        // Jeśli mamy nowy obrazek, dodajemy go do tablicy wartości
        const values = imageURL ? [name, age, description, imageURL, categoryId, caretakerId, animalId] : [name, age, description, categoryId, caretakerId, animalId];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to update animal' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Animal not found' });
            }

            // Jeśli był nowy obrazek, usuwa się poprzedni obrazek
            if (imageURL) {
                const ds = `SELECT imageURL FROM animals WHERE animalId = ?`;
                db.query(ds, [animalId], (err, results) => {
                    if (err) {
                        console.error('Error fetching old image:', err);
                    } else {
                        const oldImageURL = results[0]?.imageURL;
                        if (oldImageURL) {
                            const oldImagePath = path.join(__dirname, '../animalImage', oldImageURL);
                            fs.unlink(oldImagePath, (unlinkError) => {
                                if (unlinkError) {
                                    console.error('Error deleting old image:', unlinkError);
                                } else {
                                    console.log('Old image deleted successfully');
                                }
                            });
                        }
                    }
                });
            }

            res.status(200).json({
                animalId,
                name,
                age,
                description,
                imageURL: imageURL || undefined,  // Jeśli nie było nowego obrazu, wysyła poprzedni obraz
                categoryId,
                caretakerId
            });
        });
    });
}; 
