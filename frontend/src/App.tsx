import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
//import './App.css';
//import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { NoteModel } from './models/noteModel';
import Note from './components/note';
import styles from '../src/styles/NotePage.module.css'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]); // se declara que va a recibir un array con elementos Note

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
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map(note => (
          <Col key={note._id}>
            <Note note ={note} className={styles.note}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
} //1)toma el json y lo convierte a string LO BORRO
//2) en el <Note>, note es el parámetro que hizo en el componente y key es el identificador, se le pasa el id de mongo
//3) pone Container, dentro pone Row que sirve para hace grid, xs es una columna para pantallas chicas, md 2 para pantallas medias y xl 3 para pantallas grandes
//4) g-4 es una clase de bootstrap, Pone Col para hacer columnas
export default App;
