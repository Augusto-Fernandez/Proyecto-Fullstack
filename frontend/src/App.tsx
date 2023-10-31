import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import styles from '../src/styles/NotePage.module.css';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import * as UserApi from './network/user_api';
import { UserModel } from './models/userModel';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null); // bsuca al user logueado en el primer render

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);

	useEffect(() => { // busca usuarios logueados en el primer render
		async function fetchLoggedInUser() {
			try {
				const user = await UserApi.getLoggedInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, []);


  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {
            loggedInUser
              ? <NotesPageLoggedInView/>
              : <NotesPageLoggedOutView/>
          }
        </>
      </Container>
      {showSignUpModal && <SignUpModal
        onDismiss={() => setShowSignUpModal(false)}
        onSignUpSuccessful={(user) => {
          setLoggedInUser(user);
          setShowSignUpModal(false);
        }}
      />}
      {showLoginModal && <LoginModal
        onDismiss={() => setShowLoginModal(false)}
        onLoginSuccessful={(user) => {
          setLoggedInUser(user);
          setShowLoginModal(false);
        }}
      />}
    </div>
  );
} //1)toma el json y lo convierte a string LO BORRO
//2) en el <Note>, note es el parámetro que hizo en el componente y key es el identificador, se le pasa el id de mongo
//3) pone Container, dentro pone Row que sirve para hace grid, xs es una columna para pantallas chicas, md 2 para pantallas medias y xl 3 para pantallas grandes
//4) g-4 es una clase de bootstrap, Pone Col para hacer columnas
//5) no entendí bien lo que hizo con AddNoteDialog
export default App;

/*
  const [notes, setNotes] = useState<NoteModel[]>([]); // se declara que va a recibir un array con elementos Note

  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);

  const [notesLoading, setNotesLoading] = useState(true); // lo puso en true porque las notes se cargan cuando hace render
  const [showNotesLoadingError, setNotesLoadingError] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);




useEffect(() => { // Hace que lo cambios ocurran cuando hace render
    async function loadNotes (){ // Las notas se reciben por promesa pero useEffect no puede ser asíncrono, por eso se hace una función asincrona dentro
      try {
        setNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes); //hace que ocurra el cambio en el render
      } catch (e) {
        console.error(e);
        setNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []) // al poner [], useEffect se ejecuta una sola vez al principio. Si no se pone, useEffect se ejecuta en cada render

  async function deleteNote(note: NoteModel){
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  // los sacó del container para hacer que valide que se cargaron antes del render
  const notesGrid = <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
                      {notes.map(note => (
                        <Col key={note._id}>
                          <Note 
                            note ={note} 
                            className={styles.note}
                            onNoteClicked={setNoteToEdit}
                            onDeleteNoteClicked={deleteNote}
                          />
                        </Col>
                      ))}
                    </Row>




<Button 
          className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`} 
          onClick={() => setshowAddNoteDialog(true)}
        >
          <FaPlus/>
          Add new Note
        </Button>
        {notesLoading && <Spinner animation='border' variant='primary'/>}
        {showNotesLoadingError && <p>Something went wrong. Please refresh the page</p>}
        {!notesLoading && !showNotesLoadingError && <>
          {notes.length>0 ? notesGrid : <p>You don't have notes</p>}
        </>}
        {showAddNoteDialog && <AddEditNoteDialog 
          onDismiss={() => setshowAddNoteDialog(false)}
          onNotesaved={(newNote) => {
            setNotes([...notes, newNote]);
            setshowAddNoteDialog(false);
          }}
        />}
        {noteToEdit && <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNotesaved={(updatedNote) =>{
            setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
            setNoteToEdit(null);
          }}
        />}
*/