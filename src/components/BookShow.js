import { useState} from 'react';
import BookEdit from './BookEdit';
import useBooksContext from '../hooks/use-books-context';

const BookShow = ({book}) => {
    const [showEdit, setShowEdit] = useState(false);
    const {deleteBookById} = useBooksContext();

    const handleDeleteClick = () => {
        deleteBookById(book.id) // we are not calling onDelete func immediately!! 
        // we use event handler to pass book.id value to onDelete func
    };

    const handleEditClick = () => {
        setShowEdit(!showEdit) // set opposite value to current ShowEdit value
    };

    const handleSubmit = () => {
        setShowEdit(false); // closing an edit form after submit
    };

    let content = <h3>{book.title}</h3>
    if (showEdit) {
        content = <BookEdit book={book} onSubmit={handleSubmit}/>;
    }

    return (
        <div className="book-show">
            <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`}></img>
           <div>{content}</div>
           <div className="actions">
            <button className="edit" onClick={handleEditClick}>Edit</button>
            <button className="delete" onClick={handleDeleteClick}>Delete</button>
           </div>
        </div>
    );
};

export default BookShow;