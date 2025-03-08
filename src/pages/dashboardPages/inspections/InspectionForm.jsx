import React, { useState, useEffect } from "react";
import { FaTimes, FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import "./InspectionForm.scss";

const InspectionForm = ({
  isOpen,
  onClose,
  onSubmit,
  onEditClick,
  mode = "add",
  inspectionData = null,
}) => {
  const [formData, setFormData] = useState({
    clientEmail: "",
    vehicle: "",
    vin: "",
    serviceType: "",
    inspectionDate: "",
    inspectionTime: "",
    miles: "",
    additionalServices: [],
  });

  const [showAdditionalServices, setShowAdditionalServices] = useState(false);
  const [serviceOptions] = useState([
    "Oil Change",
    "Tire Rotation",
    "Brake Inspection",
    "Engine Diagnostic",
    "Fluid Change",
    "Air Filter Replacement",
  ]);

  const getFormTitle = () => {
    switch (mode) {
      case "view":
        return "View Inspection";
      case "edit":
        return "Edit Inspection";
      default:
        return "Add Inspection";
    }
  };

  const isReadOnly = mode === "view";

  useEffect(() => {
    if (inspectionData) {
      setFormData({
        clientEmail: inspectionData.inspectorEmail || "",
        vehicle: inspectionData.vehicle || "",
        vin: inspectionData.vin || "",
        serviceType: inspectionData.serviceType || "",
        inspectionDate: inspectionData.inspectionDate || "",
        inspectionTime: inspectionData.inspectionTime || "",
        miles: inspectionData.mileage
          ? inspectionData.mileage.replace(" miles", "")
          : "",
        additionalServices: inspectionData.additionalServices || [],
      });

      if (
        inspectionData.additionalServices &&
        inspectionData.additionalServices.length > 0
      ) {
        setShowAdditionalServices(true);
      }
    } else {
      setFormData({
        clientEmail: "",
        vehicle: "",
        vin: "",
        serviceType: "",
        inspectionDate: "",
        inspectionTime: "",
        miles: "",
        additionalServices: [],
      });
    }
  }, [inspectionData, isOpen]);

  const handleChange = (e) => {
    if (isReadOnly) return;

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddAdditionalService = () => {
    if (isReadOnly) return;

    setFormData({
      ...formData,
      additionalServices: [
        ...formData.additionalServices,
        { name: "", description: "" },
      ],
    });
  };

  const handleRemoveAdditionalService = (index) => {
    if (isReadOnly) return;

    const updatedServices = [...formData.additionalServices];
    updatedServices.splice(index, 1);
    setFormData({
      ...formData,
      additionalServices: updatedServices,
    });
  };

  const handleAdditionalServiceChange = (index, field, value) => {
    if (isReadOnly) return;

    const updatedServices = [...formData.additionalServices];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      additionalServices: updatedServices,
    });
  };

  const handleSwitchToEdit = () => {
    onClose();
    if (typeof onEditClick === "function" && inspectionData?.id) {
      onEditClick(inspectionData.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{getFormTitle()}</h2>
          {mode === "view" && (
            <button className="edit-button" onClick={handleSwitchToEdit}>
              <FaEdit />
            </button>
          )}
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clientEmail">Client Email</label>
            <input
              type="email"
              id="clientEmail"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              required
              placeholder="Enter client email"
              disabled={isReadOnly}
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="vehicle">Vehicle</label>
              <input
                type="text"
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                placeholder="Enter vehicle model"
                disabled={isReadOnly}
              />
            </div>

            <div className="form-group half">
              <label htmlFor="vin">VIN</label>
              <input
                type="text"
                id="vin"
                name="vin"
                value={formData.vin}
                onChange={handleChange}
                placeholder="Enter vehicle VIN"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="serviceType">Service Type</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="service-select"
              disabled={isReadOnly}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="inspectionDate">Inspection Date</label>
              <input
                type="date"
                id="inspectionDate"
                name="inspectionDate"
                value={formData.inspectionDate}
                onChange={handleChange}
                required
                disabled={isReadOnly}
              />
            </div>

            <div className="form-group half">
              <label htmlFor="inspectionTime">Inspection Time</label>
              <input
                type="time"
                id="inspectionTime"
                name="inspectionTime"
                value={formData.inspectionTime}
                onChange={handleChange}
                required
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="miles">No. of Miles</label>
            <input
              type="number"
              id="miles"
              name="miles"
              value={formData.miles}
              onChange={handleChange}
              min="0"
              placeholder="Enter mileage (numbers only)"
              required
              disabled={isReadOnly}
            />
          </div>

          <div className="additional-services-section">
            <div
              className="section-header"
              onClick={() => setShowAdditionalServices(!showAdditionalServices)}
            >
              <h3>Additional Services</h3>
              <button type="button" className="toggle-button">
                {showAdditionalServices ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {showAdditionalServices && (
              <div className="additional-services-content">
                {formData.additionalServices.map((service, index) => (
                  <div key={index} className="additional-service-item">
                    <div className="service-header">
                      <h4>Additional Service No.{index + 1}</h4>
                      {!isReadOnly && (
                        <button
                          type="button"
                          className="remove-service"
                          onClick={() => handleRemoveAdditionalService(index)}
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor={`serviceName-${index}`}>
                        Service Name
                      </label>
                      <input
                        type="text"
                        id={`serviceName-${index}`}
                        value={service.name}
                        onChange={(e) =>
                          handleAdditionalServiceChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Enter service name"
                        disabled={isReadOnly}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`serviceDescription-${index}`}>
                        Service Description
                      </label>
                      <textarea
                        id={`serviceDescription-${index}`}
                        value={service.description}
                        onChange={(e) =>
                          handleAdditionalServiceChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows="3"
                        placeholder="Enter service description"
                        disabled={isReadOnly}
                      ></textarea>
                    </div>
                  </div>
                ))}

                {!isReadOnly && (
                  <button
                    type="button"
                    className="add-service-button"
                    onClick={handleAddAdditionalService}
                  >
                    + Add Another Service
                  </button>
                )}
              </div>
            )}
          </div>

          {!isReadOnly && (
            <div className="form-actions">
              <button type="submit" className="submit-button">
                {mode === "edit" ? "Update" : "Submit"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default InspectionForm;
