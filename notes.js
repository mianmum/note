console.log('starting notes.js...');

const fs = require('fs');

const fetchNotes = () => {
  try {
    const noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync(`notes-data.json`, JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body
  };
  const duplicateNotes = notes.filter( note => note.title === title );

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  };
};

const getAll = () => {
  console.log('Getting all notes...');
  return fetchNotes();
};

const getNote = title => {
  console.log(`Getting ${title}...`)
  const notes = fetchNotes();
  const filteredNotes = notes.filter( note => note.title === title);
  return filteredNotes[0];
};

const removeNote = title => {
  console.log(`Removing ${title}...`)
  const notes = fetchNotes();
  const filteredNotes = notes.filter( note => note.title !== title );
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

const log = note => {
  debugger;
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  log
};
