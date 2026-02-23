import Event from "./event";
import { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationBar from "./Navbar";
import useEventStore from "../Zustand-stores/useEventStore";

export default function Events() {
  const [showAlert, setShowAlert] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventFavorites, setEventFavorites] = useState([]);

  useEffect(() => {
    useEventStore.getState().fetchEvents();
    setEvents(useEventStore.getState().events);
    setEventFavorites(
      useEventStore.getState().events.filter((event) => event.isFavorite),
    );
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

      <h1 style={{ marginTop: "20px", textAlign: "center" }}>Favorites</h1>
      <Row>
        {eventFavorites.map((event, index) => (
          <Col key={index}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
    </>
  );
}
