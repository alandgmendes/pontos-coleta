import React, {  useState } from "react";
import Select from 'react-select';
import Cookies from "universal-cookie";
import MapGoogle from "./Design/Components/map/MapGoogle";
import BackButton from "./Design/Components/buttons/BackButton";
import Points from "./Design/Components/points/Points";

const cookies = new Cookies();



// get token generated on login
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  const [tipoConsulta, setTipoConsulta] = useState('');
  


  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }

  
  const optionsConsulta = [
    { value: 'Mapa', label: 'Mapa' },
    { value: 'AddPt', label: 'Criar ponto' },
  ]
  const handleOptionsConsulta =(e)=>{
    setTipoConsulta(e.value);
  }

  
 
  return (
    <div className="text-center">     

      {/* displaying our message from our API call */}
      {token && <>
        <Select placeholder={"Escolha um tipo de ação"} options={optionsConsulta} onChange={e => handleOptionsConsulta(e)} onClick={e => handleOptionsConsulta(e)}/>
        
        { tipoConsulta === "Mapa" &&<MapGoogle />}
        { tipoConsulta === "AddPt" &&<Points />}
        {/* logout */}
        <br/><br/><br/><BackButton></BackButton><br/><br/><br/><br/>
        <button type="submit" variant="danger" onClick={() => logout()}>
          Logout
        </button>
      </>}      
    </div>
  );
}
