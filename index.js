const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const { Pool } = require('pg');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// route to notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/notes.html'));
});

// Catch all route to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/index.html'));
});


// Route to get notes from db.json
app.get('/api/notes', (req, res) => {
    // const filePath = path.join(__dirname, 'db', 'db.json');
    // console.log(`Reading file from: ${filePath}`);
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

app.listen(PORT, () =>
console.log (`App listening at http://localhost:${PORT}`)
);




// const pool = new Pool(
//     {
//         user: 'postgres',
//         password: 'abhorsen',
//         host: 'localhost',
//         database: 'movie_db'
//     },
//     console.log('Connected to the movie_db database!')
// )


// pool.connect()



// const express = require('express');
// const path = require('path');
// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));









/*
app.get('/api/movies', (req, res) => {
    pool.query('SELECT * FROM movies', function (err, {rows}){
        res.json(rows);
    })
});


app.get('/api/movie-reviews', (req, res) => {
    pool.query('SELECT * FROM reviews JOIN movies ON reviews.movie_id = movies.id', function (err, {rows}){
        res.json(rows);
    })
});

app.post('/api/movies', (req, res) => {
    const { title } = req.body;
    pool.query('INSERT INTO movies(title) VALUES($1)', [title], (err, resp) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error adding movie' });
      } else {
        console.log(resp);
        res.json({ status: 'ok111' });
      }
    });
  });

//   app.delete('/api/movies/:id', (req, res) => {
//     const movieId = req.params.params.id;

//     pool.query('DELETE FROM movies WHERE id ', [movieId], (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Error deleting movie' })
//         }
//     })

    app.delete('/api/movies/:id', (req, res) => {
        const movieId = req.params.id;
        pool.query('DELETE FROM movies WHERE id = $1', [movieId], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error deleting movie' });
            } else {
                res.json({ status: 'ok' });
            }
        });
    });

//     readFromFile('./movies_db.sql')
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//         // Make a new array of all movies except the one with the ID provided in the URL
//         const result = json.filter((movies) => movies.id !== movieId);
//         // Save that array to the filesystem
//         writeToFile('./db/tips.json', result);
//     // Respond to the DELETE request
//     res.json(`Item ${movieId} has been deleted :wastebasket:`);
//     });
// });



//   app.post('/api/movies', (req, res) => {
//     const { title } = req.body;
//     pool.query('INSERT INTO movies(title) VALUES($1)', [title], (err, resp) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Error adding movie' });
//       } else {
//         console.log(resp);
//         res.json({ status: 'ok111' });
//       }
//     });
//   });




app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );


// const express = require('express');
// const path = require('path');

// // Import the feedback router
// const api = require('./routes/index');

// const PORT = 3001;

// const app = express();

// // Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Middleware to serve up static assets from the public folder
// app.use(express.static('public'));

// // Send all the requests that begin with /api to the index.js in the routes folder
// app.use('/api', api);

// // This view route is a GET route for the homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// // This view route is a GET route for the feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
// );

*/
