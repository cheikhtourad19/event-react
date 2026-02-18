import Event from "./event";
import { useState, useEffect } from "react";
import { Alert, Button, Navbar } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { getallEvents, addEvent, editEvent, deleteEvent } from "../api/api";
import { Link } from "react-router-dom";
import NavigationBar from "./Navbar";

export default function Events() {
  const [showAlert, setShowAlert] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fatchEvents();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }, []);

  const fatchEvents = async () => {
    try {
      const response = await getallEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <>
      {showAlert && (
        <Alert variant="success">Hey welcome to esprit events</Alert>
      )}
      <NavigationBar bg="light" expand="lg" />
      <Row>
        {events.map((event, index) => (
          <Col key={index}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
      <Link to="/add-event" style={{ textDecoration: "none" }}>
        <Button
          variant="info"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          Add event
        </Button>
      </Link>
    </>
  );
}
