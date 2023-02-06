import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

const url = "http://localhost:5000";

function App() {
  const [notes, setNotes] = useState([]);

  React.useEffect(() => {
    axios.get(url + "/")
      .then((res) => {
        setNotes(res.data)
      })
      .catch((err) => console.error(err));
  }, []);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });

    axios.post(url + "/add", newNote)
      .catch((err) => console.log(err));
  }
  
  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    axios.post(url + "/delete", {title: id.title, content: id.content, time: id.time})
      .then(() => {
        async function fetchNotes() {
          try {
            const result = await axios.get(url);
            setNotes(result.data);
          } catch (err) {
            console.error(err);
          }
        }
        fetchNotes();
      })
      .catch((err) => console.log(err));
  }  

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="notes-area">
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            time={noteItem.time}
            onDelete={deleteNote}
          />
        );
      })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
