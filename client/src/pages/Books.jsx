import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        //Fetches All Books from SQL Server
        const fetchAllBooks = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllBooks();
    },[])
    //Function for Deleting Books
    const handleDelete = async (id)=>{
        try{
            await axios.delete(`http://localhost:8800/books/${id}`);
            //Reloads The Page to Display Updates
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    } 

    return (
        <div>
            <h1>Book Shop</h1>
                <div className="books">
                    {books.map(book=>(
                        <div className="book" key={book.id}>
                            {book.cover && <img src={book.cover} alt=""/>}
                            <h2>{book.title}</h2>
                            <p>{book.desc}</p>
                            <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                            <button className="update"><Link to={`/update/${book.id}`} style={{ color: "inherit", textDecoration: "none" }}>Update</Link></button>
                            <p>${book.price}</p>
                        </div>
                    ))}
                </div>
                <button><Link to={"/add"}>Add new book</Link></button>
        </div>
    )
}
