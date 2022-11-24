const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const PORT = 3001;
const app = express();


app.get('/', (req, rees) =>{
    res.send( `testing`)
});

app.get('/api', (req, res) => {
    res.json({
      term: 'api',
      description:
        'An application programming interface, is a computing interface that defines interactions between multiple software intermediaries',
    });
  });
  
  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
  