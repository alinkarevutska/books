import { createContext, useState } from "react";
import axios from 'axios';

const BooksContext = createContext();

function Provider({children}) {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
    const responce = await axios.get('http://localhost:3001/books');
    setBooks(responce.data);
    };

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);
    
        const updatedBooks = books.filter((book) => {
          return book.id !== id;
        });
    
        setBooks(updatedBooks);
    };
    
    // finding a particular book in the books object and editing it
    const editBookById = async (id, newTitle) => {
    const responce = await axios.put(`http://localhost:3001/books/${id}`, {
        title: newTitle
    });
    
    const editedBooks = books.map((book) => {
        if (book.id === id) {
        return { ...book, ...responce.data} // we do not update parts of book object manually - we take all data from the responce and put it to our editedBooks piece of state
        };
        return book;
    });
    setBooks(editedBooks);
    };
    
    const createBook = async (title) => {
    const responce = await axios.post('http://localhost:3001/books', {
        title: title
    });

    const updatedBooks = [
        ...books,
        responce.data // adding a title from the responce to a updatedBooks array
    ];
    setBooks(updatedBooks);
    console.log(updatedBooks);
    }

    const valueToShare = {
        books, // as our keys and values are identical, we can leave just one name of variable: books === books: books
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks, 
    }

    return <BooksContext.Provider value={valueToShare}>
        {children}
    </BooksContext.Provider>
}

export {Provider};
export default BooksContext;