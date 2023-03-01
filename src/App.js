import {useState} from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList'

function App() {
  const [books, setBooks] = useState([]);

  const deleteBookById = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  // finding a particular book in the books object and editing it
  const editBookById = (id, newTitle) => {
    const editedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, title: newTitle}
      };
      return book;
    });
    setBooks(editedBooks);
  };

  const createBook = (title) => {
    console.log('need to add book with title:', title);
    const updatedBooks = [
      ...books,
      { id: Math.round(Math.random() * 9999), 
        title: title }
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
