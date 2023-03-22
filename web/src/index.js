import mysql from 'mysql'
import express from 'express'
import { faker } from '@faker-js/faker';

const app = express()
const port = 3000

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'development'
})

connection.connect()
connection.query('CREATE TABLE IF NOT EXISTS peoples (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL)')

const selectPeoples = "SELECT * FROM peoples"
const insertPeople = "INSERT INTO peoples (name) VALUES ('PEOPLE_NAME')"

app.get('/', (req, res) => {
  connection.query(insertPeople.replace("PEOPLE_NAME", faker.name.firstName()))
  connection.query(
    selectPeoples, 
    function (error, result) {
      if (error) throw error;

      let list = '<ul>'
      for(let i = 0; i < result.length; i++){
        list += `<li>${result[i].name}</li>`
      }
      list += '</ul>'

      res.send(`<h1>Full Cycle Rocks!</h1>${list}`)
    }
  );  
})

app.listen(port, () => {
  console.log('Server started on port: ' + port)
})