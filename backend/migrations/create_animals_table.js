const db = require('../config/database');


const createAnimalsTable =  () => {
    const query = 
    `
        CREATE TABLE IF NOT EXISTS animals (
            animalId INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            species VARCHAR(255) NOT NULL,
            age INT NOT NULL,
            description TEXT NOT NULL,
            categoryId INT, 
            caretakerId INT,
            FOREIGN KEY (caretakerId) REFERENCES users(userId)
                ON DELETE SET NULL ON UPDATE CASCADE,
            FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
                ON DELETE SET NULL ON UPDATE CASCADE
        ) ENGINE=InnoDB;
    `
;

db.query(query, (err) => {
    if (err) {
        console.error("Błąd przy tworzeniu tabeli animals:", err);
    } else {
        console.log("Tabela animals jest gotowa.");
    }
});

};


module.exports = createAnimalsTable;