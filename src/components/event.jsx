import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
function Event({ event }) {
  const [eventL, setEventL] = useState(event);
  const [showAlert, setShowAlert] = useState(false);

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
        </Card.Footer>
      </Card>
    </>
  );
}

export default Event;
