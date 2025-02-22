import React from "react";
import defaultImage from "./assets/default-img.jpg";

function AnimalPopup({ animal, onClose, onAdopt, onDonate }) {
  console.log(animal);
  return (
    <div className="popup">
      <div className="animal-inner-popup">
        <button className="submit-btn event-btn close-button" onClick={onClose}>
          Zamknij
        </button>
        <div className="animal-row">
          <img
            src={
              `http://localhost:8001/animalImage/${animal.imageURL}` ||
              defaultImage
            }
            alt={animal.name}
          />
          <div>
            <h2>{animal.name}</h2>
            <p>
              Wiek: {animal.age}{" "}
              {animal.age === 1
                ? "rok"
                : animal.age < 1 || animal.age > 4
                ? "lat"
                : "lata"}
            </p>
            <span>Dane opiekuna:</span>

            {animal.caretakerName && (
              <>
                <p>Imię: {animal.caretakerName}</p>
                <p>Nazwisko: {animal.caretakerSurname}</p>
                <p>Email: {animal.caretakerEmail}</p>
                <p>Telefon: {animal.caretakerPhone}</p>
              </>
            )}
            {!animal.caretakerName && <p>Brak danych opiekuna</p>}
          </div>
        </div>
        <span>Opis zwierzęcia:</span>
        <div className="animal-description">
          <p>{animal.description}</p>
        </div>
        <div className="btn-container">
          <button
            className="btn add-btn"
            onClick={() => onAdopt(animal.animalId)}
          >
            Adoptuj
          </button>
          <button className="btn add-btn" onClick={onDonate}>
            Wpłać
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimalPopup;
