import React from "react";

function BookCard({ book, onDeleteBook }) {
  function handleDeleteBook() {
    fetch(`http://localhost:9292/books/${book.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteBook(book));
  }

  return (
    <li key={book.id}>
      Title: {book.title} <button onClick={handleDeleteBook}>Delete</button>{" "}
      <br /> <button>Edit</button>
      <ul>
        <li> Genre: {book.genre}</li>
      </ul>
    </li>
  );
}

export default BookCard;
