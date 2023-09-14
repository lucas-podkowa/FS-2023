
import { Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Login from "./Login";
import Menu from "./Menu";
import Reservas from "./Models/Reservas";
import Vehiculos from "./Models/Vehiculos";
import Home from "./Home";
import ComponenteClass from "./Ejemplos_Hooks/ComponenteClass";
import Clock from "./Clock";
import Toggle from "./Toggle";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home lastName="Lucas" />}></Route>
        <Route path="/reservas" element={<Reservas />}></Route>
        <Route path="/vehiculos" element={<Vehiculos />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/texto/:text" element={<Texto />} />
        <Route path="/reloj" element={<Clock />} />
        <Route path="/boton" element={<Toggle />} />
        <Route path="/hook" element={<ComponenteClass />} />

      </Routes>

    </>
  );
}


function Texto() {
  const { text } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let mode = searchParams.get('mode');
  return <>
    <div className={mode === 'dark' ? 'dark-mode' : ""}>
      <h1>Texto: {text}</h1>
      <hr />
      <h2>parametro pasado despues de ?:  {searchParams.get('sec')}</h2>
    </div>
    <hr /><hr /><br />
    <button onClick={() => navigate(-1)}>← Back</button>
    <button onClick={() => navigate('/login')}>Ir a login</button>
  </>
}



export default App;
