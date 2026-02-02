import Event from "./event";
import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import eventsData from "../data/events.json";
import { Row, Col } from "react-bootstrap";

export default function Events() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }, []);

  return (
    <>
      {showAlert && (
        <Alert variant="success">Hey welcome to esprit events</Alert>
      )}
      <Row>
        {eventsData.map((event, index) => (
          <Col key={index}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
    </>
  );
}
