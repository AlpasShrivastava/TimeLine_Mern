import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Event from "./Pages/Event/Event";
import UserIndex from "./Pages/User/Index";
import EventForm from "./Pages/Event/Form";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserIndex />} />
        <Route path="/admin" element={<Navbar />}>
          <Route path="home" element ={<Home /> }/>
          <Route path="event" element={<Event />} /> 
          <Route path="add-event" element={<EventForm />} /> 
        </Route>
      </Routes>
    </>
  );
}

export default App;
