import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries/query';

import BookDetails from './BookDetails';

export default function BookList() {
    const [selected, setSelected] = useState(null);

    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <ul class="book-list">
                {data.books.map(book => <li key={book.id} 
                onClick={e => {setSelected(book.id)}}
                >{book.name}</li>)}
            </ul>
            <BookDetails bookId={selected}/>
        </div>
    )
}