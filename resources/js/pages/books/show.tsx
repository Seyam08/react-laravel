import { Head } from '@inertiajs/react';

import { BookCard } from '@/components/book-components/book-card';
import type { Book } from '@/types';

export default function BooksShow({
    book,
    can,
}: {
    book: Book;
    can: { update: boolean; delete: boolean };
}) {
    return (
        <>
            <Head title={book.title} />
            <BookCard book={book} can={can} />
        </>
    );
}
