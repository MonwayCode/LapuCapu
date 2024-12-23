const db = require('../config/database');


exports.addAnimal = (req, res) => {
    const { name, species, age, description, imageURL, categoryId, caretakerId } = req.body;

    const sql = `
        INSERT INTO animals (name, species, age, description, imageURL, categoryId, caretakerId)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, species, age, description, imageURL, categoryId, caretakerId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to add animal' });
        }

        res.status(201).json({
            id: result.insertId,
            name,
            species,
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



exports.deleteAnimalById = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM animals WHERE id = ?';
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
    const { name, species, age, description, imageURL, categoryId, caretakerId } = req.body;

    
    if (!name || !species || !age || !description) {
        return res.status(400).json({ error: 'Name, species, age, and description are required' });
    }

    
    const sql = `
        UPDATE animals
        SET 
            name = ?, 
            species = ?, 
            age = ?, 
            description = ?, 
            imageURL = ?, 
            categoryId = ?, 
            caretakerId = ?
        WHERE animalId = ?
    `;

    
    const values = [name, species, age, description, imageURL, categoryId, caretakerId, id];

   
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
            species,
            age,
            description,
            imageURL,
            categoryId,
            caretakerId
        });
    });
};