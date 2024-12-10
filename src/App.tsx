import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PersonaSetup}  from './pages/PersonaSetup';
import Chat from "./pages/Chat";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PersonaSetup />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
