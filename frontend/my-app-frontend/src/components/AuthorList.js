import React from "react";
import AuthorForm from "./AuthorForm";
import BookCard from "./BookCard";

function AuthorList({ authors, setAuthors, name, hometown, books }) {
  const handleDeleteBook = (deletedBook) => {
    const updatedAuthors = authors.map((author) => {
      if (author.id === deletedBook.author_id) {
        const updatedBooks = author.books.filter(
          (book) => book.id !== deletedBook.id
        );
        return { ...author, books: updatedBooks };
      } else {
        return author;
      }
    });
    setAuthors(updatedAuthors);

    // map through each author
    // find the author whose books need to be updated
    // take book out of the author's book
    // return copy of author object with smaller books array
    // return author when nothing changes with other authors
    // result of map will be updated as state for authors
  };

  return (
    <div>
      <h2>
        {name} from {hometown}
        <br />
        Books:
        <ul>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              books={books}
              onDeleteBook={handleDeleteBook}
            />
          ))}
        </ul>
      </h2>
    </div>
  );
}

export default AuthorList;
