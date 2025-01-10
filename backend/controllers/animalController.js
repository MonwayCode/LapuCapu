const db = require('../config/database');

exports.addAnimal = (req, res) => {
    const { name, age, description, imageURL, categoryId, caretakerId } = req.body;

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
            id: result.insertId,
            name,
            age,
            description,
            imageURL,
            categoryId,
            caretakerId,
            
        });
    });
};



exports.getAnimalById = (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM animals WHERE animalId = ?';
    db.query(sql, [id], (err, results) => {
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
            a.name AS animalName,
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

exports.deleteAnimalById = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM animals WHERE animalId = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Failed to delete an animal'});
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({message: 'Animal not found.'});
        }

        res.status(200).json({message: 'success!'});
    })
}



exports.updateAnimal = (req, res) => {
    const { id } = req.params;
    const { name, age, description, imageURL, categoryId, caretakerId } = req.body;

    
    if (!name || !age || !description) {
        return res.status(400).json({ error: 'Name, , age, and description are required' });
    }

    
    const sql = `
        UPDATE animals
        SET 
            name = ?, 
             = ?, 
            age = ?, 
            description = ?, 
            imageURL = ?, 
            categoryId = ?, 
            caretakerId = ?
        WHERE animalId = ?
    `;

    
    const values = [name, , age, description, imageURL, categoryId, caretakerId, id];

   
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to update animal' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        
        res.status(200).json({
            id,
            name,
            age,
            description,
            imageURL,
            categoryId,
            caretakerId
        });
    });
};