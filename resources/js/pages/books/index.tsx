import { Head } from '@inertiajs/react';
import { Fragment } from 'react';

import { BookItem } from '@/components/book-item';
import { ItemGroup } from '@/components/ui/item';
import type { Book } from '@/types';

export default function BooksIndex({ books }: { books: { data: Book[] } }) {
    return (
        <>
            <Head title="Books" />
            <h1 className="text-2xl font-semibold">Books</h1>
            <ItemGroup className="mt-6">
                {books.data.map((book) => (
                    <Fragment key={book.id}>
                        <BookItem book={book} />
                    </Fragment>
                ))}
            </ItemGroup>
        </>
    );
}
