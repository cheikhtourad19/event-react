import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Alert } from "react-bootstrap";
function Event({ event }) {
  const [eventL, setEventL] = useState(event);
  const [showAlert, setShowAlert] = useState(false);

  if (eventL.img.trim() === "") {
    eventL.img = "placeholder.jpg";
  }
  if (eventL.nbTickets === 0) {
    eventL.img = "sold_out.png";
  }
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
        <Card.Img style={{ height: "180px" }} variant="top" src={eventL.img} />
        <Card.Body>
          <Card.Title style={{ height: "50px" }}>{eventL.name}</Card.Title>
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
