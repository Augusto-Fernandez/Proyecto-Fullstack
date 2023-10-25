import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
//import { Button } from 'react-bootstrap';
import { Note } from './models/note';

function App() {
  const [notes, setNotes] = useState<Note[]>([]); // se declara que va a recibir un array con elementos Note

  useEffect(() => { // Hace que lo cambios ocurran cuando hace render
    async function loadNotes (){ // Las notas se reciben por promesa pero useEffect no puede ser asíncrono, por eso se hace una función asincrona dentro
      try {
        const responce = await fetch("/api/notes", {method:"GET"});//hace el get a esa URL. Antes estaba http://localhost:8081/api/notes pero lo puso en el proxy del package.json porque había un problema de CORS
        const notes = await responce.json(); //recibe el json de la respuesta
        setNotes(notes); //hace que ocurra el cambio en el render
      } catch (e) {
        console.error(e);
        alert(e);
      }
    }
    loadNotes();
  }, []) // al poner [], useEffect se ejecuta una sola vez al principio. Si no se pone, useEffect se ejecuta en cada render

  return (
    <div className="App">
      {JSON.stringify(notes)}
    </div>
  );
} //toma el json y lo convierte a string

export default App;
