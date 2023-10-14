
import { Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from "./Menu";
import Home from "./Home";
import Login from "./Login";
import Reservas from "./Models/Reservas";
import Reservas_Edit from "./Models/Reservas_Edit";
import Vehiculos from "./Models/Vehiculos";
import Vehiculos_Edit from "./Models/Vehiculos_Edit";
import ComponenteClass from "./Ejemplos_Hooks/ComponenteClass";
import Clock from "./Ejemplos/Clock";
import Toggle from "./Ejemplos/Toggle";


function App() {
  return (
    <>
      <Menu />
      <ToastContainer />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home lastName="Lucas" />}></Route>
          {/* Login */}
          <Route path="/login" element={<Login />}></Route>

          {/* Reservas */}
          <Route path="/reservas" element={<Reservas />}></Route>
          <Route path="/reservas/edit/:reserva_id" element={<Reservas_Edit />}></Route>
          <Route path="/reservas/edit" element={<Reservas_Edit />} />

          {/* Reservas */}
          <Route path="/vehiculos" element={<Vehiculos />}></Route>
          <Route path="/vehiculos/edit" element={<Vehiculos_Edit />} />
          <Route path="/vehiculo/edit/:vehiculo_id" element={<Vehiculos_Edit />} />

          {/* Otros */}
          <Route path="/texto/:text" element={<Texto />} />
          <Route path="/reloj" element={<Clock />} />
          <Route path="/boton" element={<Toggle />} />
          <Route path="/hook" element={<ComponenteClass />} />

        </Routes>

      </div>

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
