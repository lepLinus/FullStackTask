const {createPool} = require('mysql2');
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

const pool = createPool({
    host: "db",
    user: "root",
    password: "password",
    database: "sample",
    connectionLimit: 10
}).promise()

app.use(express.json());

app.get('/books',async (req,res) => {
    const result = await pool.query("SELECT * FROM Books");
    const response = '{ "content":' + JSON.stringify(result[0]) + '}'
    res.status(200).send(JSON.parse(response));
});

app.post('/adbook',async (req,res) => {
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    try{
        const result0 = await pool.query("SELECT * FROM Books WHERE Title='"+title+"' AND Author='" + author + "' AND Description='" + description+"'");
        if(JSON.stringify(result0[0]).length < 10){
            var result = await pool.query("INSERT INTO `Books` (`Title`, `Author`, `Description`) VALUES('"+ title +"', '" + author + "', '" + description+ "')");
            result = JSON.stringify("{" + result[0] + "}");
            res.status(200).send(result);
        }
    }catch(e){
        res.status(200).send(e);
        console.log(e);
    }
});

app.post('/editbook/:id',async (req,res) => {
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    try{
        var result = await pool.query("UPDATE Books SET Title='"+title+"',Author='" + author + "',Description='" + description + "' WHERE Id="+id);
        result = JSON.stringify("{" + result[0] + "}");
        res.status(200).send(result);
    }catch(e){
        res.status(200).send(e);
        console.log(e);
    }
});

app.delete('/delbook/:id', async (req,res) => {
    const {id} = req.params;
    const result = await pool.query("DELETE FROM Books WHERE Id=" + id);
    res.status(200).send(result);
});

app.listen(8080,() => console.log("API server running"))