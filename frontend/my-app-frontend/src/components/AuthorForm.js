import React, { useState } from "react";

function AuthorForm({ onAddAuthor }) {
  const [data, setData] = useState({
    name: "",
    hometown: "",
    books: [{ title: "", genre: "" }],
  });

  function handleChange(e, index) {
    const { name, value } = e.target;
    if (name === "name" || name === "hometown") {
      setData({ ...data, [name]: value });
    } else {
      const updatedBooks = [...data.books];
      updatedBooks[index][name] = value;
      console.log(updatedBooks);
      console.log(index);
      setData({ ...data, books: updatedBooks });
    }
  }

  function addBookForm() {
    if (data.books.length < 3) {
      setData({ ...data, books: [...data.books, { title: "", genre: "" }] });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nonEmptyBooks = data.books.filter((book) => book.title && book.genre);

    const authorData = {
      name: data.name,
      hometown: data.hometown,
      books: nonEmptyBooks,
    };

    fetch("http://localhost:9292/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorData),
    })
      .then((resp) => resp.json())
      .then((newAuthor) => onAddAuthor(newAuthor));
  }

  return (
    <section>
      <h1>New Author:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter Your Name Here"
          />
          <br />
        </label>
        <label>
          Hometown:{" "}
          <input
            type="text"
            name="hometown"
            value={data.hometown}
            onChange={handleChange}
            placeholder="Where are they from?"
          />
          <br />
        </label>
        <h2>Books Written:</h2>
        <ul>
          {data.books.map((book, index) => (
            <li key={index}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={book.title}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Enter Book Title"
                />
              </label>
              <label>
                Genre:
                <input
                  type="text"
                  name="genre"
                  value={book.genre}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Enter Book Genre"
                />
              </label>
            </li>
          ))}
        </ul>
        <button type="button" onClick={addBookForm}>
          Add Book
        </button>{" "}
        <button type="submit">Add New Author</button>
      </form>
    </section>
  );
}

export default AuthorForm;
