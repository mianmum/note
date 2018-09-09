console.log('starting app...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const titleOptions = {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  }
};

const bodyOptions = {
  body: {
    describe: 'Body text of note',
    demand: true,
    alias: 'b'
  }
};

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a specified note', {
    title: titleOptions
  })
  .command('remove', 'Remove a specified note', {
    title: titleOptions
  })
  .help()
  .argv;
const command = argv._[0];

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (!note) {
    console.log('Error: note title already in use');
  } else {
    console.log('Note added');
    notes.log(note);
  };
} else if (command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)...`);
  allNotes.forEach( note => notes.log(note) );
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if (note) {
    console.log('Reading note...');
    notes.log(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title);
  const message = noteRemoved ? 'Note removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized!');
  console.log(argv);
};
