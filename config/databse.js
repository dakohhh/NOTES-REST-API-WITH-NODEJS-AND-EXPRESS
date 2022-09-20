import mysql2 from "mysql2"
import dotenv from "dotenv"
dotenv.config()

export const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()


export function create_database(){
    pool.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        conn.query("CREATE DATABASE noteapi", function (err, result) {
          if (err) throw err;
          console.log("Database created");
        });
      });
}




