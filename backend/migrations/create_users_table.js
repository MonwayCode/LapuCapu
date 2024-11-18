const db = require('../config/database');

const createUsersTable = () => { 
    const query = 
    `
        CREATE TABLE IF NOT EXISTS users (
            userId INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(25) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            phone VARCHAR(9) NOT NULL,
            password VARCHAR(50) NOT NULL
        ) ENGINE=InnoDB;
    `
;

db.query(query, (err) => {
    if (err) 
    {
        console.error("Błąd przy tworzeniu tabeli users:", err);
    } else 
    {
        console.log("Tabela users jest gotowa.");
    }
});

};

module.exports = createUsersTable;