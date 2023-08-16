




const mysql= require("mysql");
const express = require("express");
const con = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"test"
});

con.connect((err)=>{
  if(err)
  {
    console.warn("not connect");
  }else{
    console.warn("connected!!!");
  }
})  

const app = express();

//create db
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE test';
    con.query(sql, (err,result) => {
          if(err)  throw err;
          console.log(result);
          res.send("Database created...");
    })
}) 

//create tables
app.get('/createpoststable', (req,res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    con.query(sql, (err,result) => {
        if(err)  throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

//Insert post
app.get('/addpost1', (req,res) => {
    let post = {title: 'Post One', body: 'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = con.query(sql, post, (err,result) => {
        if(err)  throw err;
        console.log(result);
        res.send('Post 1 added...');
    })
}) 

//Insert post 2
app.get('/addpost2', (req,res) => {
    let post = {title: 'Post Two', body: 'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = con.query(sql, post, (err,result) => {
        if(err)  throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

//Select posts

app.get('/getposts', (req,res) => {
   
    let sql = 'SELECT * FROM posts';
    let query = con.query(sql, (err,results) => {
        if(err)  throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

//Select single posts
app.get('/getpost/:id', (req,res) => {
   
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = con.query(sql, (err,result) => {
        if(err)  throw err;
        console.log(result);
        res.send('Posts fetched...');
    });
});

//Update post
app.get('/updatepost/:id', (req,res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = con.query(sql, (err,result) => {
        if(err)  throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

//Delete post 
app.get('/deletepost/:id', (req,res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = con.query(sql, (err,result) => {
        if(err)  throw err;
        console.log(result);
        res.send('Post deleted...');
    });
}); 

app.listen('3000', () => {
    console.log('Server started on port 3000');
});