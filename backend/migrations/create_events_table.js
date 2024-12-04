const db = require('../config/database');

const createEventsTable = () => { 
    const query = 
    `
        CREATE TABLE IF NOT EXISTS events (
            eventId INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            shortDescription TEXT,
            longDescription TEXT,
            imageUrl VARCHAR(255)
        ) ENGINE=InnoDB;
    `
;

db.query(query, (err) => {
    if (err) {
        console.error("Błąd przy tworzeniu tabeli events:", err);
    } else {
        console.log("Tabela events jest gotowa.");
    }
});

};

module.exports = createEventsTable;