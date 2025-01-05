import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Contact() {
  return (
    <div className="contact">
      <div className="contact-section">
        <h1>Dane teleadresowe</h1>
        <div className="underline"></div>
        <p className="subtitle">Schronisko dla zwierząt Łapu Capu</p>

        <div className="contact-item">
          <div className="icon">
            <FontAwesomeIcon
              icon={faHome}
              style={{ color: "#255f9cef" }}
              size="2x"
            />
          </div>
          <p>ul. Przytulna 12, 00-001 Miastowo</p>
        </div>

        <div className="contact-item">
          <div className="icon">
            <FontAwesomeIcon
              icon={faPhone}
              style={{ color: "#255f9cef" }}
              size="2x"
            />
          </div>
          <p>+48 123 456 789</p>
        </div>

        <div className="contact-item">
          <div className="icon">
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: "#255f9cef" }}
              size="2x"
            />
          </div>
          <p>kontakt@lapucapu.pl</p>
        </div>
      </div>

      <div className="contact-section">
        <div className="hours-section">
          <h1>Godziny otwarcia</h1>
          <div className="underline"></div>
          <div className="hours-table">
            <div className="table-header">Adopcje</div>
            <div className="table-row">
              <span>Poniedziałek – Piątek</span>
              <span>10 – 19</span>
            </div>
            <div className="table-row">
              <span>Sobota – Niedziela</span>
              <span>10 – 15</span>
            </div>
            <div className="table-row">
              <span>Święta</span>
              <span>nieczynne</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
