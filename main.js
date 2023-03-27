const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();

const sendMail = require('./src/nodemailer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

// Mariadb conexão com banco de dados
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: '192.168.0.100',
  port: '3306',
  user: 'root',
  password: '',
  database: 'musicfy',
  connectionLimit: 5
});



teste






const execQuery = (sql, params) => new Promise((resolve, reject) => {
  
  pool.getConnection().then(conn => {
    conn.query(sql).then(result => {
      resolve(result);
      conn.end();
    }).catch(err => {
      reject(err);
    });
  });

});


// Login
app.post('/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (!req.body.name || !req.body.password) return res.send({ auth: false, message: 'Por favor, preencha todos os campos obrigatórios!' }).end();

  const sql = `
    SELECT * FROM usuarios
    WHERE name = "${btoa(req.body.name)}"
    AND password = "${btoa(req.body.password)}"
  `;
  
  const response = async () => {
    const result = await execQuery(sql);
    console.log(result);
  }
  
  responde();
});

// Register
app.post('/register', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (!req.body.name || !req.body.password) return res.send({ auth: false, message: 'Por favor, preencha todos os campos obrigatórios!' }).end();

  pool.getConnection()
    .then(conn => {
      conn.query(`
        SELECT * FROM usuarios
        WHERE email = "${btoa(req.body.email)}"
      `)
        .then((rows) => {
          console.log(rows)
          if (rows[0]) return {
            auth: false,
            message: 'Email ja esta em uso!',
          };

          const code = Math.random().toString().substr(2, 6);

          sendMail.send({
            name: req.body.name,
            email: req.body.email,
            authorization: code
          });

          conn.query(`
            SELECT * FROM valid WHERE email = "${btoa(req.body.email)}"
          `)
          .then(result => {
            if (result[0]) {
              return conn.query(`
                UPDATE valid
                SET code = "${btoa(code)}",
                name = "${btoa(req.body.name)}",
                password = "${btoa(req.body.password)}"
                WHERE email = "${btoa(req.body.email)}"
              `);
            }

            conn.query(`
              INSERT INTO valid (name, email, password, code) VALUES (
                "${btoa(req.body.name)}",
                "${btoa(req.body.email)}",
                "${btoa(req.body.password)}",
                "${btoa(code)}"
              )`);
          });
        })
        .catch(err => {
          console.log(err);
          conn.end();
        });
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

app.post('/verify-code', (req, res) => {
  // pool.getConnection()
  //   .then(conn => {
  //     conn.query(`SELECT * FROM valid`).then(result => console.log(result))
  //   })
    
  pool.getConnection()
    .then(conn => {
      conn.query(`
        SELECT * FROM valid 
        WHERE email = 'cGJxdnRwa2JiZGtra2NtamV1QGJiaXRqLmNvbQ=='
      `, (result) => {
        console.log(result);
        conn.end();
      });
    }).catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

app.listen(8080, 'localhost', () => {
  console.log('Server is running!');
});