const db = require('../config/database');


exports.addAnimal = (req, res) => {
    const { name, species, age, description, category_id, caretakerName, caretakerContact } = req.body;

    const sql = `
        INSERT INTO animals (name, species, age, description, category_id, caretakerName, caretakerContact)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, species, age, description, category_id, caretakerName, caretakerContact];

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
            category_id,
            caretakerName,
            caretakerContact,
        });
    });
};



exports.getAnimalById = (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM animals WHERE id = ?';
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
    const { name, species, age, description, category_id, caretakerName, caretakerContact } = req.body;  // Nowe dane zwierzęcia

    if (!name || !species || !age || !description || !category_id || !caretakerName || !caretakerContact) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    
    const sql = `
        UPDATE animals
        SET 
            name = ?, 
            species = ?, 
            age = ?, 
            description = ?, 
            category_id = ?, 
            caretakerName = ?, 
            caretakerContact = ?
        WHERE id = ?
    `;

    const values = [name, species, age, description, category_id, caretakerName, caretakerContact, id];

    
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
            category_id,
            caretakerName,
            caretakerContact,
        });
    });
};