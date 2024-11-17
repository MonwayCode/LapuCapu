const db = require('../config/database');



const createCategoriesTable = () => { 
    const query = `
    CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
    );
`;

db.query(query, (err) => {
    if (err) {
        console.error("Błąd przy tworzeniu tabeli categories:", err);
    } else {
        console.log("Tabela categories jest gotowa.");
    }
});

};

module.exports = createCategoriesTable;