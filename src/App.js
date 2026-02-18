import "./App.css";
import Events from "./components/events";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NotFound from "./components/notfound";
import AddEvent from "./components/addEvent";
import { EventDetail } from "./components/eventDetails";
import UpdateEvent from "./components/updateEvent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/events/:event" element={<EventDetail />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/update-event/:eventId" element={<UpdateEvent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
