import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";



function FileInput() {
  const cookies = new Cookies();
  const email = cookies.get("EMAIL");
  const [base64, setBase64] = useState("");
  const [isLocated, setIsLocated] = useState(false);
  const [ obs, setObs] = useState();
  const [position, setPosition] = useState({latitude: null, longitude: null});

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64(reader.result);
    };
  };
  
  const handleObsChange = (e) => {
    const text = e.currentTarget.value;
    setObs(text);
  }

  const handleSubmit = () =>{
    const d = new Date();
    const year = d.getFullYear();
    const month =  d.getMonth() + 1;
    const day = d.getDate();
    const dateSend = `${day}/${month}/${year}`
    const obsSend = obs;
    const configuration = {
      method: "POST",
      url: "http://localhost:4000/createpoint",
      data: {
        author: email,
        datetime: dateSend,
        base64img: base64,
        obs: obsSend,
        lat: position.latitude,
        long: position.longitude
      }
    };
    debugger;
    axios(configuration)
      .then((result) => {
        console.log(result);
        window.location.href = "/auth";

      })
      .catch((error) => {
        console.log(error);
        error = new Error();
      });
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setIsLocated(true);
      },
      error => console.log(error)
    );
    
  });

  return (
    <Form>
        <Form.Group controlId="fileinput">
          {!isLocated && <h1>Não foi possível localizar você</h1>}
          <input type="file" onChange={handleFileInputChange} />
        </Form.Group>
        <Form.Group controlId="obs">
        <input type="text" onChange={e => handleObsChange(e)} />
        </Form.Group>
        <Button
            variant="success"
            onClick={(e) => handleSubmit(e)}          
          >
            Enviar ponto
        </Button>
    </Form>
  );
}

export default FileInput;






