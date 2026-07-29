import { Head, router } from '@inertiajs/react';
import { Fragment } from 'react';

import { BookItem } from '@/components/book-components/book-item';
import { ItemGroup } from '@/components/ui/item';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type { Book, Paginated } from '@/types';

function visit(url: string | null) {
    if (!url) {
        return;
    }

    router.visit(url, { preserveScroll: true, preserveState: true });
}

export default function BooksIndex({ books }: { books: Paginated<Book> }) {
    const firstLink = books.links[0];
    const lastLink = books.links[books.links.length - 1];
    const pageLinks = books.links.slice(1, -1);

    return (
        <>
            <Head title="Books" />
            <h1 className="text-2xl font-semibold">Books</h1>
            <ItemGroup className="mt-6 space-y-4">
                {books.data.map((book) => (
                    <Fragment key={book.id}>
                        <BookItem book={book} />
                    </Fragment>
                ))}
            </ItemGroup>

            <Pagination className="mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={firstLink.url ?? '#'}
                            aria-disabled={!firstLink.url}
                            className={!firstLink.url ? 'pointer-events-none opacity-50' : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                visit(firstLink.url);
                            }}
                        />
                    </PaginationItem>

                    {pageLinks.map((link, index) =>
                        link.label === '...' ? (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={link.label}>
                                <PaginationLink
                                    href={link.url ?? '#'}
                                    isActive={link.active}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        visit(link.url);
                                    }}
                                >
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        ),
                    )}

                    <PaginationItem>
                        <PaginationNext
                            href={lastLink.url ?? '#'}
                            aria-disabled={!lastLink.url}
                            className={!lastLink.url ? 'pointer-events-none opacity-50' : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                visit(lastLink.url);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
