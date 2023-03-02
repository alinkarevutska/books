import {useState, useEffect} from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';


function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const responce = await axios.get('http://localhost:3001/books');
    setBooks(responce.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById}/>
      <BookCreate onCreate={createBook}/>
    </div>
  );
}

export default App;
