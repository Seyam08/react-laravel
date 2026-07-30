import { Head, router } from '@inertiajs/react';
import { Fragment } from 'react';

import { AuthorItem } from '@/components/author-components/author-item';
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
import type { Author, Paginated } from '@/types';

function visit(url: string | null) {
    if (!url) {
        return;
    }

    router.visit(url, { preserveScroll: true, preserveState: true });
}

export default function AuthorsIndex({ authors }: { authors: Paginated<Author> }) {
    const firstLink = authors.links[0];
    const lastLink = authors.links[authors.links.length - 1];
    const pageLinks = authors.links.slice(1, -1);

    return (
        <>
            <Head title="Authors" />
            <h1 className="text-2xl font-semibold">Authors</h1>
            <ItemGroup className="mt-6 space-y-4">
                {authors.data.map((author) => (
                    <Fragment key={author.id}>
                        <AuthorItem author={author} />
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
