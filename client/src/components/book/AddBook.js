import React, { useState } from "react";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../../queries/queries";
import { graphql, compose } from "react-apollo";

const AddBook = ({ getAuthorsQuery, addBookMutation }) => {
  const [state, setState] = useState({
    name: "",
    genre: "",
    authorId: ""
  });

  const displayAuthors = () => {
    const { loading, authors } = getAuthorsQuery;

    if (loading) {
      return <option>Loading Authors ...</option>;
    } else {
      return authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = e => {
    e.preventDefault();

    addBookMutation({
      variables: state,
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  const onChangeCell = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form id="add-book" onSubmit={e => submitForm(e)}>
        <div className="field">
          <label>Book name:</label>
          <input
            name="name"
            type="text"
            onChange={e => onChangeCell(e)}
            value={state.name}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            name="genre"
            type="text"
            onChange={e => onChangeCell(e)}
            value={state.genre}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select name="authorId" onChange={e => onChangeCell(e)}>
            <option value="">Select Authors</option>
            {displayAuthors()}
          </select>
        </div>
        <button disabled={state.authorId === "" ? true : false}>+</button>
      </form>
    </div>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
