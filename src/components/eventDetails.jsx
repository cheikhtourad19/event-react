import { useParams } from "react-router-dom";
import eventsData from "../data/events.json";
import { Button, Card } from "react-bootstrap";
import { useState } from "react";

export function EventDetail() {
  const eventid = useParams().event;
  const [event, setEvent] = useState(
    eventsData.find((event) => event.id === parseInt(eventid)),
  );

  if (event.img.trim() === "") {
    event.img = "placeholder.jpg";
  }
  if (event.nbTickets === 0) {
    event.img = "sold_out.png";
  }
  const bookevent = () => {
    event.nbTickets -= 1;
    event.nbParticipants += 1;
    setEvent({ ...event });
  };
  return (
    <Card>
      <Card.Img style={{ height: "180px" }} variant="top" src={event.img} />
      <Card.Body>
        <Card.Title style={{ height: "50px" }}>{event.name}</Card.Title>
        <Card.Text>price :{event.price}</Card.Text>
        <Card.Text>number of tickets : {event.nbTickets}</Card.Text>
        <Card.Text>number of participants: {event.nbParticipants}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          disabled={event.nbTickets === 0}
          onClick={bookevent}
          variant="primary"
        >
          Book event
        </Button>
        <Button
          onClick={() => {
            event.like = !event.like;
            setEvent({ ...event });
          }}
          variant={event.like ? "danger" : "secondary"}
          style={{ marginLeft: "10px" }}
        >
          {event.like ? "Dislike" : "Like"}
        </Button>
      </Card.Footer>
    </Card>
  );
}
