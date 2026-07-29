import { Head } from '@inertiajs/react';
import { Fragment } from 'react';

import { AuthorCard } from '@/components/author-components/author-card';
import { BookItem } from '@/components/book-components/book-item';
import { ItemGroup } from '@/components/ui/item';
import type { Author } from '@/types';

export default function AuthorsShow({ author }: { author: Author }) {
    return (
        <>
            <Head title={author.name} />
            <AuthorCard author={author} />

            {author.books && author.books.length > 0 && (
                <ItemGroup className="mt-6 space-y-4">
                    {author.books.map((book) => (
                        <Fragment key={book.id}>
                            <BookItem book={book} />
                        </Fragment>
                    ))}
                </ItemGroup>
            )}
        </>
    );
}
