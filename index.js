const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// route to notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/notes.html'));
});

// Route to get notes from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile( path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Failed to read notes from database' });
            return;
        }
        try {
            const notes = JSON.parse(data);
            console.log(notes);
            res.json(notes);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Failed to parse notes data' });
        }
    });
});

// Route to add a new note to db.json
app.post('/api/notes', (req, res) => {
    const filePath = path.join(__dirname, 'db', 'db.json');
    const newNote = req.body;

    // Generate a unique ID for the new note
    newNote.id = uuidv4();
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Failed to read notes from database' });
            return;
        }

        try {
            const notesData = JSON.parse(data);
            console.log(notesData);
            notesData.push(newNote);

            fs.writeFile(filePath, JSON.stringify(notesData, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                    res.status(500).json({ error: 'Failed to save the note' });
                    return;
                }
                console.log('Note added:', newNote);
                res.json(newNote); // Send the newly added note back to the client
            });
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Failed to parse notes data' });
        }
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const filePath = path.join(__dirname, 'db', 'db.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Failed to read notes from database' });
            return;
        }

        try {
            let notesData = JSON.parse(data);
            notesData = notesData.filter(note => note.id !== noteId);
            console.log(notesData)

            fs.writeFile(filePath, JSON.stringify(notesData, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                    res.status(500).json({ error: 'Failed to delete the note' });
                    return;
                }

                console.log('Note deleted:', noteId);
                res.json({ status: 'ok' });
            });
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Failed to parse notes data' });
        }
    });
});

// Catch all route to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/index.html'));
});


app.listen(PORT, () =>
console.log (`App listening at http://localhost:${PORT}`)
);
