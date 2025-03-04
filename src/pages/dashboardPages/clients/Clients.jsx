import React from "react";

import "./clients.scss";
import { FaPhone } from "react-icons/fa6";
import { FaMobile } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import ProfileImg from "../../../assets/images/profile.png";
import ClientCarImg from "../../../assets/images/client_car.png";

const ClientsPage = () => {
  return (
    <div className="top-layer-client-container">
      <div className="header">
        <div className="title">Clients</div>
      </div>

      <div className="client-container">
        <div className="client-left-col">
          <div className="profile-img">
            <img src={ProfileImg} />
          </div>
          <div className="profile-name">Bianca Karim</div>
          <div className="profile-details">
            <div className="profile-data">
              <FaPhone /> <div className="profile-detail">+62-21-6385 3435</div>
            </div>
            <div className="profile-data">
              <FaMobile />
              <div className="profile-detail">+62-21-6385 3435</div>
            </div>
            <div className="profile-data">
              <MdEmail />
              <div className="profile-detail">info@prohukum.com</div>
            </div>
          </div>
        </div>
        <div className="client-right-col">
          <div className="profile-car-img">
            <img src={ClientCarImg} />
          </div>
          <div className="profile-btns">
            <button className="hyper-button">Edit</button>
            <button className="hyper-button-secondary">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
