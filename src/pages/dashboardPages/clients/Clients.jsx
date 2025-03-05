import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

import "./clients.scss";
import { FaPhone } from "react-icons/fa6";
import { FaMobile } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import clientListData from "../../../data/clientList.data";
import ProfileImg from "../../../assets/images/profile.png";
import ClientCarImg from "../../../assets/images/client_car.png";
import { SlOptionsVertical } from "react-icons/sl";

const ClientsPage = () => {
  return (
    <div className="client-container">
      <div className="header">
        <div className="title">Clients</div>
      </div>
      <div className="top-layer-client-container">
        {/* <div className="client-profile-container">
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
       </div> */}

        <div className="client-list-container">
          <div className="header">
            <div className="client-header">Client List</div>
            {/* <div className="show-status">
              <h6>show</h6>
              <select name='active-status' id='active-status' className="active-filter">
                <option value="day">Active</option>
                <option value="week">Past</option>
                <option value="month">New</option>
                <option value="year">Reguler</option>
              </select>
            </div> */}
            <div className="hyper-button">Create</div>
          </div>

          <table className="client-list-table">
            <thead>
              <tr>
                <th>NO</th>
                <th>CODE</th>
                <th>CLIENT NAME</th>
                <th>ADDRESS</th>
                <th>CONTACT PERSON</th>
                <th>PHONE</th>
                <th>EMAIL</th>
              </tr>
            </thead>

            <tbody>
              {clientListData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.no}</td>
                    <td>{data.code}</td>
                    <td>{data.clientName}</td>
                    <td>{data.address}</td>
                    <td>{data.contactPerson}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>
                      <div className="menu-client-action">
                        <Dropdown>
                          <Dropdown.Toggle
                            id="menu-dropdown" className="menu-client-dropdown"
                          >
                            <SlOptionsVertical />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#edit">Edit</Dropdown.Item>
                            <Dropdown.Item href="#delete">Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="new-client-list-container">
          <div className="header">
            <div className="client-header">New Client List</div>
          </div>

          {clientListData.slice(0, 8).map((data, index) => {
            return (
              <div key={index} className="new-client-list">
                <img src={ProfileImg} className="new-client-img" />
                <div className="new-client-details">
                  <div className="new-client-name">{data.clientName}</div>
                  <div className="new-client-email">{data.email}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="frequent-client-list-container">
          <div className="header">
            <div className="client-header">Frequent Client List</div>
          </div>

          <div className="client-profile-container">
            {clientListData.slice(0, 4).map((data, index) => {
              return (
                <div key={index} className="client-left-col">
                  <button className="menu-btn">
                    <SlOptionsVertical />
                  </button>
                  <div className="profile-img">
                    <img src={ProfileImg} />
                  </div>
                  <div className="profile-name">{data.clientName}</div>
                  <div className="profile-details">
                    <div className="profile-data">
                      <FaPhone />
                      <div className="profile-detail">{data.phone}</div>
                    </div>
                    <div className="profile-data">
                      <FaMobile />
                      <div className="profile-detail">{data.address}</div>
                    </div>
                    <div className="profile-data">
                      <MdEmail />
                      <div className="profile-detail">{data.email}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
