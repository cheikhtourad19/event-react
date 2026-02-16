import "./App.css";
import Events from "./components/events";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NotFound from "./components/notfound";
import { EventDetail } from "./components/eventDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/events/:event" element={<EventDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
