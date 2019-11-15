import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/query';


export default function BookDetails( props ) {
    const { loading, error, data } = useQuery(getBookQuery, {
        skip: !props.bookId,
        variables: { id: props.bookId }
        // options:(props)=>{
        //     return{
        //         variables:{
        //             id:props.bookId
        //         }
        //     }
        // }
    });

    let content;
    if (loading) content = <p>Loading...</p>;
    else if (error) content = <p>Error :(</p>;
    else if (!props.bookId) content = <p>No book selected</p>;
    else {
       const {
          book: { name, genre, author }
       } = data;
       const books = author.books.map(({ id, name }) => {
          return <li key={id}>{name}</li>;
       });
       content = (
          <>
             <h2>{name}</h2>
             <p>{genre}</p>
             <p>{author.name}</p>
             <p>All boooks by this author</p>
             <ul className="other-books">{books}</ul>
          </>
       );
    }
    return <div id="book-details">{content}</div>;
}