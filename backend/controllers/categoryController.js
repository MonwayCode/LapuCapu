const db = require('../config/database');


exports.addCategory = (req, res) => {
    const { name, description } = req.body;

    const sql = `
        INSERT INTO categories (name, description)
        VALUES (?, ?)
    `;
    const values = [name, description];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to add category' });
        }

        res.status(201).json({
            id: result.insertId,
            name,
            description,
        });
    });
};




exports.getCategoryById = (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM categories WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve category' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(results[0]);
    });
};




exports.deleteCategoryById = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM categories WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Failed to delete a category'});
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({message: 'Category not found.'});
        }

        res.status(200).json({message: 'success!'});
    })
}



exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    
    if (!name || !description) {
        return res.status(400).json({ error: 'Both name and description are required' });
    }

    
    const sql = `
        UPDATE categories
        SET 
            name = ?, 
            description = ?
        WHERE id = ?
    `;

    const values = [name, description, id];

    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to update category' });
        }

        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        
        res.status(200).json({
            id,
            name,
            description,
        });
    });
};