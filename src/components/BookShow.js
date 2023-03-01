import React from 'react';
import { useState } from 'react';
import BookEdit from './BookEdit';

const BookShow = ({book, onDelete, onEdit}) => {
    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
        onDelete(book.id) // we are not calling onDelete func immediately!! 
        // we use event handler to pass book.id value to onDelete func
    };

    const handleEditClick = () => {
        setShowEdit(!showEdit) // set opposite value to current ShowEdit value
    };

    const handleSubmit = (id, newTitle) => {
        setShowEdit(false); // closing an edit form after submit
        onEdit(id, newTitle); // receiving a particular book data from the child component and running a book title editing process in App.js
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