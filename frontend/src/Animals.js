import React, { useState, useEffect } from "react";
import SuccessAlert from "./SuccessAlert";
import defaultImage from "./assets/default-img.jpg";
import AnimalPopup from "./AnimalPopup";
import { useGlobalContext } from "./GlobalContext";
import { Tabs, Tab } from "react-bootstrap";

function Animals() {
  const { userId } = useGlobalContext();
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popup, setPopup] = useState(false);
  const [categoryPopup, setCategoryPopup] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    age: "",
    description: "",
    categoryId: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [showAnimalPopup, setShowAnimalPopup] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8001/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8001/animals")
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((err) => console.error("Failed to fetch animals:", err));
  }, []);

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
            categoryId: "",
          }
    );
    setPopup(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewAnimal((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // Tworzymy obiekt do wysłania z tymczasowym categoryId ustawionym na null
    const animalToSubmit = { ...newAnimal, categoryId: null };

    if (selectedAnimal) {
      // Edycja istniejącego zwierzęcia
      fetch(`http://localhost:8001/animals/${selectedAnimal.animalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animalToSubmit),
      })
        .then((res) => {
          if (res.ok) {
            // Aktualizujemy stan po edycji
            setAnimals((prevAnimals) =>
              prevAnimals.map((animal) =>
                animal.animalId === selectedAnimal.animalId
                  ? { ...animalToSubmit, animalId: selectedAnimal.animalId }
                  : animal
              )
            );
            setPopup(false); // Zamykamy formularz
            setSelectedAnimal(null); // Resetujemy wybrane zwierzę
            setAlert({
              show: true,
              message: "Pomyślnie zaktualizowano zwierzę",
            });
          } else {
            console.error("Failed to update animal");
          }
        })
        .catch((err) => console.error("Error updating animal:", err));
    } else {
      // Dodawanie nowego zwierzęcia
      fetch("http://localhost:8001/animals/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animalToSubmit),
      })
        .then((res) => res.json())
        .then((data) => {
          // Dodajemy nowego zwierzaka do stanu
          setAnimals((prevAnimals) => [...prevAnimals, data]);
          setPopup(false); // Zamykamy formularz
          setAlert({ show: true, message: "Pomyślnie dodano nowe zwierzę" });
        })
        .catch((err) => {
          console.error("Failed to add animal:", err);
        });
    }
  };

  const handleDelete = (animalId) => {
    console.log("Deleting animal with animalId:", animalId);
    fetch(`http://localhost:8001/animals/${animalId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // Po usunięciu zwierzęcia, zaktualizuj stan animals
          setAnimals((prevAnimals) =>
            prevAnimals.filter((animal) => animal.animalId !== animalId)
          );
          setAlert({ show: true, message: "Pomyślnie usunięto zwierzę" });
        } else {
          console.error("Failed to delete animal");
        }
      })
      .catch((err) => console.error("Error deleting animal:", err));
  };

  //dodawanie nowej kategorii
  const handleAddCategory = () => {
    fetch("http://localhost:8001/categories/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Category added:", data);
        setCategories((prevCategories) => [...prevCategories, data]); // Dodanie kategorii do stanu
        setCategoryPopup(false); // Zamknięcie popupu
        setNewCategory({ name: "", description: "" }); // Czyszczenie formularza
        setAlert({ show: true, message: "Pomyślnie dodano nową kategorię" });
      })
      .catch((err) => console.error("Failed to add category:", err));
  };

  const handleAnimalClick = (animal) => {
    setShowAnimalPopup(animal);
  };

  const closePopup = () => {
    setShowAnimalPopup(null);
  };

  // zwięrzęta z danej kategorii
  const renderAnimals = (filteredAnimals) => {
    return filteredAnimals.length > 0 ? (
      filteredAnimals.map((animal) => (
        <div key={animal.animalId} className="animal">
          <img
            src={animal.imageURL || defaultImage}
            alt={animal.name}
            onClick={() => handleAnimalClick(animal)}
          />
          <h2>{animal.name}</h2>
          <p>
            Wiek: {animal.age}{" "}
            {animal.age === 1
              ? "rok"
              : animal.age < 1 || animal.age > 4
              ? "lat"
              : "lata"}
          </p>
          <p>
            {animal.description.length > 100
              ? animal.description.slice(0, 100) + "..."
              : animal.description}
          </p>
          <p className="more-info" onClick={() => handleAnimalClick(animal)}>
            Dowiedz się więcej
          </p>
          <div className="buttons">
            {userId && (
              <button
                style={{ marginBottom: "5px" }}
                className="btn add-btn"
                onClick={() => handleDelete(animal.animalId)}
              >
                Usuń zwierzę
              </button>
            )}
            {userId && (
              <button className="btn add-btn" onClick={() => openForm(animal)}>
                Edytuj
              </button>
            )}
          </div>
        </div>
      ))
    ) : (
      <h2>Brak zwierząt do adopcji</h2>
    );
  };

  return (
    <div>
      {/* alert */}
      {alert.show && (
        <SuccessAlert
          message={alert.message}
          onClose={() => setAlert({ show: false, message: "" })}
        />
      )}

      <div className="container-events">
        <div className="animals-buttons-container">
          {/* Dodawanie kategorii */}
          {userId && (
            <button
              className="submit-btn event-btn"
              style={{ marginRight: "15px" }}
              onClick={() => setCategoryPopup(true)}
            >
              Dodaj kategorię
            </button>
          )}
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

          {/* dodawanie / updatowanie zwierzat */}
          {userId && (
            <button className="submit-btn event-btn" onClick={() => openForm()}>
              Dodaj zwierzę
            </button>
          )}
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
                    <label htmlFor="categoryId" className="form-label">
                      Kategoria
                    </label>
                    <select
                      id="categoryId"
                      value={newAnimal.categoryId}
                      className="form-control"
                      onChange={handleChange} // Aktualizuje newAnimal.categoryId
                    >
                      <option value="" disabled>
                        Wybierz kategorię...
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    Dane opiekuna
                    {/* Opcje z pobranych opiekunów? */}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Zdjęcie</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImageFile(e.target.files[0])} // dodawanie zdjęcia do imageFile
                    />
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

        {/* Zakładki z kategoriami zwierząt */}
        <Tabs
          defaultActiveKey="all"
          id="animal-tabs"
          className="mb-3 nav-justified"
        >
          <Tab eventKey="all" title="Wszystkie zwierzęta">
            <div
              className={`animals ${animals.length === 1 ? "single-item" : ""}`}
            >
              {renderAnimals(animals)}
            </div>
          </Tab>
          {categories.map((category) => {
            const filteredAnimals = animals.filter(
              (animal) => animal.categoryId === category.categoryId
            );
            return (
              <Tab
                key={category.categoryId}
                eventKey={category.categoryId}
                title={category.name}
              >
                <div
                  className={`animals ${
                    filteredAnimals.length === 1 ? "single-item" : ""
                  }`}
                >
                  {renderAnimals(filteredAnimals)}
                </div>
              </Tab>
            );
          })}
        </Tabs>

        {/* Popup wybranego zwierzaka */}
        {showAnimalPopup && (
          <AnimalPopup animal={showAnimalPopup} onClose={closePopup} />
        )}
      </div>
    </div>
  );
}

export default Animals;
