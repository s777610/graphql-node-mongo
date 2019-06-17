import React, { useState } from "react";
import BookDetails from "./BookDetails";

import { graphql } from "react-apollo";
import { getBooksQuery } from "../../queries/queries";

const BookList = ({ data }) => {
  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    if (data.loading) {
      return <div>Loading books ...</div>;
    } else {
      return data.books.map(book => {
        return (
          <li
            key={book.id}
            onClick={() => {
              setSelected(book.id);
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
