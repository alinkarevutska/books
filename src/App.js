import {useState} from 'react';
import BookCreate from './components/BookCreate';

function App() {
  const [books, setBooks] = useState([]);

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
    <div>
      <BookCreate onCreate={createBook}/>
    </div>
  );
}

export default App;
