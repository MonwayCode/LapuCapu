const db = require('../config/database');


const createAnimalsTable =  () => {
    const query =
    `
    CREATE TABLE IF NOT EXISTS animals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        species VARCHAR(255) NOT NULL,
        age INT,
        description TEXT,
        category_id INT, -- Zmieniamy na klucz obcy
        caretakerName VARCHAR(255),
        caretakerContact VARCHAR(255),
        FOREIGN KEY (category_id) REFERENCES categories(id) 
        ON DELETE SET NULL ON UPDATE CASCADE
    );
`;

db.query(query, (err) => {
    if (err) {
        console.error("Błąd przy tworzeniu tabeli animals:", err);
    } else {
        console.log("Tabela animals jest gotowa.");
    }
});

};


module.exports = createAnimalsTable;