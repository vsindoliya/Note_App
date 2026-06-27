import React, { useState, useEffect } from "react";
import "./NotesApp.css";

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  // load saved notes when app starts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  // save notes whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (text.trim() === "") return;
    setNotes([...notes, text]);
    setText("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Notes App</h2>

      <div className="input-row">
        <input
          type="text"
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      <input
        type="text"
        className="search"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredNotes.map((note, index) => (
          <li key={index}>
            {note}
            <button className="delete-btn" onClick={() => deleteNote(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesApp;
