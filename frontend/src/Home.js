import React, { useEffect, useState } from "react";
import mainImage from "./assets/homepage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDog,
  faCat,
  faEnvelope,
  faCalendar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/animals")
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((err) => console.error("Failed to fetch animals:", err));

    fetch("http://localhost:8001/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const getAnimalCountByCategory = (categoryName) => {
    if (categories.length === 0) return 0;

    const category = categories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (category) {
      return animals.filter(
        (animal) => animal.categoryId === category.categoryId
      ).length;
    }
    return 0;
  };

  const dogCount = getAnimalCountByCategory("pies");
  const catCount = getAnimalCountByCategory("kot");

  function getDogLabel(count) {
    if (count === 1) return "pies";
    if (
      count % 10 >= 2 &&
      count % 10 <= 4 &&
      (count % 100 < 10 || count % 100 >= 20)
    )
      return "psy";
    return "psów";
  }

  function getCatLabel(count) {
    if (count === 1) return "kot";
    if (
      count % 10 >= 2 &&
      count % 10 <= 4 &&
      (count % 100 < 10 || count % 100 >= 20)
    )
      return "koty";
    return "kotów";
  }

  return (
    <div>
      <div className="home-card--container">
        <div className="home-card--content">
          <div className="home-card--desc">
            <h1>Witaj w naszym schronisku dla zwierząt!</h1>
            <p>
              Naszym celem jest pomoc porzuconym i potrzebującym zwierzętom w
              znalezieniu kochających domów. Każdego dnia pracujemy nad tym, aby
              zapewnić naszym podopiecznym opiekę, bezpieczeństwo i szansę na
              lepsze życie. W naszym schronisku znajdziesz psy, koty oraz inne
              zwierzęta, które czekają na swoją nową rodzinę. Adopcja to nie
              tylko szansa na nowe życie dla zwierzęcia, ale także niezwykłe
              doświadczenie, które przyniesie Ci radość i satysfakcję. Poznaj
              naszych podopiecznych i pomóż im znaleźć miejsce w swoim sercu i
              domu!
            </p>
          </div>
          <img src={mainImage} alt="zdjęcie psa" className="home-card--photo" />
        </div>
      </div>

      <div className="shelter-info">
        <h2>Obecnie w naszym schronisku przebywa:</h2>
        <div className="info-container">
          <div className="info-item">
            <div className="icon-row">
              <div>
                <div className="info-text">{dogCount}</div>
                <div className="info-subtext">{getDogLabel(dogCount)}</div>
              </div>
              <FontAwesomeIcon icon={faDog} className="info-icon" />
            </div>
          </div>
          <div className="info-item">
            <div className="icon-row">
              <FontAwesomeIcon icon={faCat} className="info-icon" />
              <div>
                <div className="info-text">{catCount}</div>
                <div className="info-subtext">{getCatLabel(catCount)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="all-animals">
          Wszystkich zwierząt: <span>{animals.length}</span>
        </div>
      </div>

      <div className="links-section">
        <div className="link-item">
          <FontAwesomeIcon icon={faHeart} className="link-icon" />
          <h3>Adopcje</h3>
          <p>
            Poznaj zwierzęta, które obecnie czekają na nowy dom w naszym
            schronisku <a href="/adoptions">Dowiedz się więcej</a>
          </p>
        </div>
        <div className="link-item">
          <FontAwesomeIcon icon={faCalendar} className="link-icon" />
          <h3>Wydarzenia</h3>
          <p>
            Bądź na bieżąco z wydarzeniami w schronisku. Zobacz, co dla Ciebie
            przygotowaliśmy. <a href="/events">Dowiedz się więcej</a>
          </p>
        </div>
        <div className="link-item">
          <FontAwesomeIcon icon={faEnvelope} className="link-icon" />
          <h3>Kontakt</h3>
          <p>
            Masz pytania lub potrzebujesz więcej informacji? Skontaktuj się z
            nami. <a href="/contact">Dowiedz się więcej</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
