import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ClientEditModel({ trigger }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="client-add-model">
      <div onClick={handleShow}>{trigger}</div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="client-add-details mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Client Name </Form.Label>
              <Form.Control type="text" placeholder="John Doe" />
              <Form.Label>NIC</Form.Label>
              <Form.Control type="text" placeholder="1234567890" />
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="+62-21-6385 3435" />
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Jl. Kebon Sirih No. 17" />
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
              <Form.Label>Upload Picture of Client</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group
              className="vehicle-add-details mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Vehicle Plate Number</Form.Label>
              <Form.Control type="text" placeholder="B 1234 ABC" />
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Control type="text" placeholder="Sedan" />
              <Form.Label>Vehicle Model</Form.Label>
              <Form.Control type="text" placeholder="Toyota Corolla" />
              <Form.Label>Vehicle Year</Form.Label>
              <Form.Control type="text" placeholder="2021" />
              <Form.Label>Vehicle Color</Form.Label>
              <Form.Control type="text" placeholder="Black" />
              <Form.Label>Upload Picture of Vehicle</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClientEditModel;
