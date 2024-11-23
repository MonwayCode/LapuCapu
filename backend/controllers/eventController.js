const db = require("../config/database");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Konfiguracja Multer do przesyłania plików
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "eventImage/"); // Folder docelowy dla przesłanych plików
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unikalna nazwa pliku
  },
});

const upload = multer({ storage }).single("image");

// Funkcja dodająca nowe wydarzenie
exports.addEvent = (req, res) => {
  upload(req, res, (err) => {
    if (err) 
    {
      return res.status(500).json;
    }

    const { title, shortDescription, longDescription} = req.body;
    const imageUrl = req.file.filename; // Ścieżka do przesłanego pliku obrazu

    const sql = `INSERT INTO events (title, shortDescription, longDescription, imageUrl) VALUES (?, ?, ?, ?)`;
    const values = [title, shortDescription, longDescription, imageUrl];

    db.query(sql, values, (error, result) => {
      if (error) 
      {
        console.error("Błąd przy zapisie do bazy danych:", error);
        return res.status(500).json;
      }
      res.status(200).json;
    });
  });
};

exports.getEvent = (req, res) => {
    const sql = `SELECT * FROM events `;
    db.query(sql, (err, results) => {
        if (err) 
        {
            console.error("Błąd przy pobieraniu wydarzenia: ", err);
        } 
        else 
        {
            res.json(results);
        }
    });
};

// Funkcja usuwająca wydarzenie oraz jego obrazek z systemu
exports.deleteEvent = (req, res) => {
  const { eventId } = req.params;  
  const sql = `SELECT imageUrl FROM events WHERE eventId = ?`;  // Pobieranie nazwy obrazka by go usunąć z folderu

  // Zapytanie o nazwę pliku z bazy
  db.query(sql, [eventId], (err, results) => {
    if (err) {
        console.error("Błąd przy pobieraniu obrazu:", err);
        return res.status(500).json({ error: "Błąd przy pobieraniu obrazu" });
    }

    if (!results.length) {
        console.error("Nie znaleziono wydarzenia z podanym eventId");
        return res.status(404).json({ error: "Nie znaleziono wydarzenia" });
    }

    const imageUrl = results[0].imageUrl; // Bezpieczny dostęp do wyników
    const filePath = path.join(__dirname, "../eventImage", imageUrl);

    // Usunięcie pliku
    fs.unlink(filePath, (error) => {
        if (error) {
            console.error("Błąd przy usuwaniu pliku:", error);
            return res.status(500).json({ error: "Błąd przy usuwaniu pliku" });
        }

        // Usunięcie wydarzenia z bazy danych
        const deleteSql = `DELETE FROM events WHERE eventId = ?`;
        db.query(deleteSql, [eventId], (deleteErr, result) => {
            if (deleteErr) {
                console.error("Błąd przy usuwaniu wydarzenia:", deleteErr);
                return res.status(500).json({ error: "Błąd przy usuwaniu wydarzenia" });
            }
            res.status(200).json({ message: "Wydarzenie zostało usunięte" });
        });
    });
});

};