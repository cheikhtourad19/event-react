import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteEvent } from "../api/api";
import useEventStore from "../Zustand-stores/useEventStore";
function Event({ event }) {
  const [eventL, setEventL] = useState(event);
  const [showAlert, setShowAlert] = useState(false);
  const navigator = useNavigate();
  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      useEventStore.getState().deleteEventObject(id);
      navigator("/");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  const handleAddToFavorites = (event) => {
    useEventStore.getState().addFavoriteObject(event);
  };
  const displayImg =
    eventL.img.trim() === ""
      ? "/placeholder.jpg"
      : eventL.nbTickets === 0
        ? "/sold_out.png"
        : eventL.img.startsWith("/")
          ? eventL.img
          : `/${eventL.img}`;
  const bookevent = () => {
    eventL.nbTickets -= 1;
    eventL.nbParticipants += 1;
    setEventL({ ...eventL });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <>
      {showAlert && (
        <Alert key={eventL.name} variant="success">
          you have successfully booked {eventL.name} !
        </Alert>
      )}
      <Card>
        <Card.Img style={{ height: "180px" }} variant="top" src={displayImg} />
        <Card.Body>
          <Card.Title style={{ height: "50px" }}>
            <Link
              to={`/events/${eventL.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {eventL.name}
            </Link>
          </Card.Title>
          <Card.Text>price :{eventL.price}</Card.Text>
          <Card.Text>number of tickets : {eventL.nbTickets}</Card.Text>
          <Card.Text>number of participants: {eventL.nbParticipants}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            disabled={eventL.nbTickets === 0}
            onClick={bookevent}
            variant="primary"
          >
            Book event
          </Button>
          <Button
            onClick={() => {
              eventL.like = !eventL.like;
              setEventL({ ...eventL });
            }}
            variant={eventL.like ? "danger" : "secondary"}
            style={{ marginLeft: "10px" }}
          >
            {eventL.like ? "Dislike" : "Like"}
          </Button>
          <Link
            to={`/update-event/${eventL.id}`}
            style={{ marginLeft: "10px" }}
          >
            <Button variant="success">update</Button>
          </Link>
          <Button variant="danger" onClick={() => handleDelete(eventL.id)}>
            Delete
          </Button>
          <Button
            variant="info"
            onClick={() => handleAddToFavorites(eventL)}
            style={{ marginLeft: "10px" }}
          >
            Add to favorites
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Event;
