import React from "react";
import BookDetails from "./BookDetails";

import { graphql } from "react-apollo";
import { getBooksQuery } from "../../queries/queries";

const BookList = ({ data }) => {
  const displayBooks = () => {
    if (data.loading) {
      return <div>Loading books ...</div>;
    } else {
      return data.books.map(book => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
