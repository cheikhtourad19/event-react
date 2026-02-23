import { addEvent } from "../api/api";
import { useNavigate } from "react-router-dom";
import useEventStore from "../Zustand-stores/useEventStore";

export default function AddEvent() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const event = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")),
      nbTickets: parseInt(formData.get("nbTickets")),
      nbParticipants: 0,
      img: formData.get("img"),
    };
    try {
      await addEvent(event);
      useEventStore.getState().addEventObject(event);
      navigate("/");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" step="0.01" required />
      </div>
      <div>
        <label>Number of Tickets:</label>
        <input type="number" name="nbTickets" required />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" name="img" />
      </div>
      <button type="submit">Add Event</button>
    </form>
  );
}
