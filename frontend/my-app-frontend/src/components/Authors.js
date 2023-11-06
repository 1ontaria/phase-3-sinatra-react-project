import React, { useEffect, useState } from "react";
import AuthorList from "./AuthorList";
import AuthorForm from "./AuthorForm";

function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/authors")
      .then((resp) => resp.json())
      .then((authors) => setAuthors(authors));
  }, []);

  function handleAddAuthor(newAuthor) {
    setAuthors([...authors, newAuthor]);
  }

  return (
    <div>
      <h1> Authors in the Spotlight:</h1>
      {authors.map((author) => (
        <AuthorList
          key={author.id}
          authors={authors}
          name={author.name}
          hometown={author.hometown}
          books={author.books}
          setAuthors={setAuthors}
        />
      ))}
      <AuthorForm onAddAuthor={handleAddAuthor} />
    </div>
  );
}

export default Authors;
