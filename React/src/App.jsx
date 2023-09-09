
import { Route, Routes, useParams } from "react-router-dom";
import Login from "./Login";
import Menu from "./Menu";
import Reservas from "./Reservas";
import Vehiculos from "./Vehiculos";
import Home from "./Home";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home lastName="Lucas" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reservas" element={<Reservas />}></Route>
        <Route path="/vehiculos" element={<Vehiculos />}></Route>
      </Routes>
    </>

  );
}

export default App;
