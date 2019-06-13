import React from "react";
import { getAuthorsQuery } from "../../queries/queries";
import { graphql } from "react-apollo";

const AddBook = ({ data }) => {
  const displayAuthors = () => {
    if (data.loading) {
      return <option>Loading Authors ...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  return (
    <div>
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author:</label>
          <select>{displayAuthors()}</select>
        </div>
        <button>+</button>
      </form>
    </div>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
