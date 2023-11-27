import express  from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
//Create connection to DB
const db = mysql.createConnection({
    host:"sql5.freesqldatabase.com",
    user:"sql5664940",
    password:"XBL2CHCPeH",
    database:"sql5664940"
})

app.use(express.json());
app.use(cors());

//Upon Successful Connection to Server(on local server)
app.get("/", (req,res)=>{
    res.json("hello this is the backend");
})
//Select All Books from Table
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
//Add Books
app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created!");
    })
})
//Delete Books
app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted!");
    })
})
//Update Books
app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?,`cover` = ? WHERE id = ?";

    const values =[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated!");
    })
})

//Upon Successful Connection(on console)
app.listen(8800, ()=>{
    console.log("Connected to backend!");
})