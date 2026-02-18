import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getallEvents, editEvent } from "../api/api";

export default function UpdateEvent() {
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const { eventId } = useParams();
  useEffect(() => {
    getEvent(eventId);
    console.log(eventId);
    console.log(event);
  }, []);

  const getEvent = async (id) => {
    const response = await getallEvents(id);
    setEvent(response.data);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const event = {
      id: formData.get("id"),
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      nbTickets: parseInt(formData.get("nbTickets")),
      nbParticipants: 0,
      img: formData.get("img"),
    };
    try {
      console.log(event);
      await editEvent(event.id, event);
      navigate("/");
    } catch {}
  };

  return (
    <form onSubmit={handleUpdateEvent}>
      <div>
        <input type="text" name="id" id="id" value={event.id} />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          required
          value={event.name || ""}
          onChange={(e) => setEvent({ ...event, name: e.target.value })}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          step="0.01"
          required
          value={event.price || 0}
          onChange={(e) => setEvent({ ...event, price: e.target.value })}
        />
      </div>
      <div>
        <label>Number of Tickets:</label>
        <input
          type="number"
          name="nbTickets"
          required
          value={event.nbTickets || 0}
          onChange={(e) => setEvent({ ...event, nbTickets: e.target.value })}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="img"
          value={event.img || ""}
          onChange={(e) => setEvent({ ...event, img: e.target.value })}
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
}
