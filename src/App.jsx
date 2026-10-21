import { useEffect, useState } from "react";

export default function App() {
  const [notes, setNotes] = useState(() =>
    JSON.parse(localStorage.getItem("notes") || "[]")
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleSubmit(e) {
    e.preventDefault();
    setNotes([
      { id: Date.now(), title: title.trim(), description: description.trim(), createdAt: new Date().toISOString() },
      ...notes,
    ]);
    setTitle("");
    setDescription("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <main>
      <h1>Notes</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            {note.createdAt && (
              <span className="timestamp">
                {new Date(note.createdAt).toLocaleString()}
              </span>
            )}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
