const db = require('../config/database');

//Pobieranie informacji o opiekunie
exports.getInfo = (req, res) =>{
    const animalId = req.params.animalId;
    
    const query = `
        SELECT u.name, u.surname, u.email, u.phone
        FROM animals a
        JOIN users u ON a.caretakerId = u.userId
        WHERE a.animalId = ?
    `
    db.query(query, [animalId], (err, results) =>{
        if(err)
        {
            console.error("Błąd przy pobieraniu informacji o opiekunie",err);
            return res.status(500).json;
        }
        else
        {
            res.json(results); 
        }
    })
}