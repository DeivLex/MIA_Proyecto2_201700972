const fs = require('fs');

//
// Create a table for example queries
//

async function setupBf(connection) {

  try {

    const stmts = [

      `DROP TABLE persona PURGE`,

      `CREATE TABLE persona(
        person_id INT NOT NULL,
        first_name VARCHAR2(50) NOT NULL,
        last_name VARCHAR2(50) NOT NULL,
        PRIMARY KEY(person_id)
        )`,

      `INSERT INTO persona
      (person_id,first_name, last_name)
      VALUES
      (1,'Julio', 'Perez')`,
      
      `INSERT INTO persona
      (person_id,first_name, last_name)
      VALUES
      (2,'Mateo', 'Lopez')`,
      
      `INSERT INTO persona
      (person_id,first_name, last_name)
      VALUES
      (3,'Marcos', 'Flores')`,
      
      `INSERT INTO persona
      (person_id,first_name, last_name)
      VALUES
      (4,'Lucas', 'Ponciano')`,
      
      `INSERT INTO persona
      (person_id,first_name, last_name)
      VALUES
      (5,'Juan', 'Chupina')`,

    ];

    for (const s of stmts) {
      try {
        await connection.execute(s);
      } catch(e) {
        if (e.errorNum != 942)
          throw(e);
      }
    }
    await connection.commit();

  } catch (err) {
    console.error(err);
  }
}


module.exports.setupBf = setupBf;