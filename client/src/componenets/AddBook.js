import React, { useMemo, useCallback, useState } from "react";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/query";
import { useQuery, useMutation } from "@apollo/react-hooks";

const getOptions = (loading, error, data) => {
  if (loading) {
    return <option disabled>Loading Authors...</option>;
  } else if (error) {
    return <option disabled>Error loading Authors</option>;
  } else {
    return data.authors.map(({ name, id }) => {
      return (
        <option key={id} value={id}>
          {name}
        </option>
      );
    });
  }
};

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [addBook] = useMutation(addBookMutation);

  const options = useMemo(() => getOptions(loading, error, data), [
    loading,
    error,
    data
  ]);

  const addCB = e => {
    e.preventDefault();
    addBook({
        variables: {name, genre, authorId: author},
        refetchQueries: [{query: getBooksQuery}]
      }
      ).catch(err => console.log(err))
  };
  return (
    <form id="add-book" onSubmit={addCB}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={e => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={e => setAuthor(e.target.value)}>
          <option>Select Author</option>
          {options}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
