const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
// const uuid = require('./helpers/uuid');
const { Pool } = require('pg');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/index.html'));
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
