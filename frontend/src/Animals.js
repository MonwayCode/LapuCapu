import React, { useState } from "react";
import Navbar from "./Navbar";

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [popup, setPopup] = useState(false);
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    age: "",
    description: "",
    categoryId: "",
    caretakerId: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const openForm = (animal = null) => {
    setSelectedAnimal(animal);
    setNewAnimal(
      animal
        ? { ...animal }
        : {
            name: "",
            species: "",
            age: "",
            description: "",
            category_id: "",
            caretakerId: "",
          }
    );
    setPopup(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewAnimal((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (selectedAnimal) {
      // zauktualizuj dane zwierzaka
    } else {
      // dodaj nowego zwierzaka
    }
    setPopup(false);
  };

  //dodawanie nowej kategorii
  const handleAddCategory = () => {
    setCategoryPopup(false);
  };

  return (
    <div>
      <Navbar />

      {/* Dodawanie kategorii */}
      <div>
        <button onClick={() => setCategoryPopup(true)}>Dodaj kategorię</button>
        {categoryPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2>Dodaj kategorię</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="catName" className="form-label">
                    Nazwa
                  </label>
                  <input
                    id="catName"
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="catDescription" className="form-label">
                    Opis
                  </label>
                  <textarea
                    id="catDescription"
                    className="form-control"
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="btn add-btn"
                  onClick={handleAddCategory}
                >
                  Dodaj
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setCategoryPopup(false);
                    setNewCategory({ name: "", description: "" });
                  }}
                >
                  Anuluj
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* dodawanie / updatowanie zwierzat */}
      <div className="container-events">
        <div>
          <button className="submit-btn event-btn" onClick={() => openForm()}>
            Dodaj zwierzę
          </button>
          {popup && (
            <div className="popup">
              <div className="popup-inner">
                <h2>{selectedAnimal ? "Edytuj zwierzę" : "Nowe zwierzę"}</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Imie
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      value={newAnimal.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="species" className="form-label">
                      Gatunek
                    </label>
                    <select
                      id="species"
                      value={newAnimal.species}
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Wybierz...
                      </option>
                      <option value="pies">Pies</option>
                      <option value="kot">Kot</option>
                      <option value="Inne zwierzę">Inne zwierzę</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                      Wiek
                    </label>
                    <input
                      id="age"
                      type="number"
                      min="0"
                      className="form-control"
                      value={newAnimal.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Opis zwierzęcia
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      value={newAnimal.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label>Kategoria</label>
                    {/* Opcje z pobranych kategorii? */}
                  </div>
                  <div className="mb-3">
                    Dane opiekuna
                    {/* Opcje z pobranych opiekunów? */}
                  </div>
                  <button
                    type="button"
                    className="btn add-btn"
                    onClick={handleSubmit}
                  >
                    {selectedAnimal ? "Aktualizuj" : "Dodaj"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setPopup(false)}
                  >
                    Anuluj
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* wyświetlanie zwierząt */}
        <div>
          {animals.length > 0 &&
            animals.map((animal) => (
              <div key={animal.id}>
                {animal.name}
                {animal.species}
                {animal.age}
                {animal.description}
                {/* kategoria */}
                {/* info opiekuna */}
                <button>Usuń zwierzę</button>
                <button onClick={() => openForm(animal)}>Edytuj</button>
              </div>
            ))}
          {animals.length === 0 && <h2>Brak zwierząt do adopcji</h2>}
        </div>
      </div>
    </div>
  );
}

export default Animals;
