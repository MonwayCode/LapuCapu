const db = require('../config/database');

const createAnimaleTable = () => {
    const checkTableQuery = 'SHOW TABLES LIKE "animals"';
    db.query(checkTableQuery, (err, results) => {
        if (err) {
            console.error("Błąd przy sprawdzaniu tabeli:", err);
            return;
        }

        if (results.length > 0) 
        {
            const checkColumnQuery = "SHOW COLUMNS FROM animals LIKE 'species'";
            db.query(checkColumnQuery, (err, columnResults) => {
                if (err) 
                {
                    console.error("Błąd przy sprawdzaniu kolumny:", err);
                    return;
                }

                if (columnResults.length > 0) 
                {
                    const dropColumnQuery = "ALTER TABLE animals DROP COLUMN species";
                    db.query(dropColumnQuery, (err) => {
                        if (err) 
                        {
                            console.error("Błąd przy usuwaniu kolumny 'species':", err);
                        } 
                        else 
                        {
                            console.log("Kolumna 'species' została usunięta.");
                        }
                    });
                }
            });
        }

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS animals (
                animalId INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                description TEXT NOT NULL,
                imageURL VARCHAR(255),
                categoryId INT, 
                caretakerId INT,
                FOREIGN KEY (caretakerId) REFERENCES users(userId)
                    ON DELETE SET NULL ON UPDATE CASCADE,
                FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
                    ON DELETE SET NULL ON UPDATE CASCADE
            ) ENGINE=InnoDB;
        `;

        db.query(createTableQuery, (err) => {
            if (err) {
                console.error("Błąd przy tworzeniu tabeli animals:", err);
            } else {
                console.log("Tabela animals jest gotowa.");
            }
        });
    });
};

module.exports = createAnimaleTable;
