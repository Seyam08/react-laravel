import { Form, Head, Link, router } from '@inertiajs/react';
import { BookPlusIcon, BookIcon } from 'lucide-react';
import { Fragment } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import books from '@/routes/books';
import type { Book, Paginated } from '@/types';

function visit(url: string | null) {
    if (!url) {
        return;
    }

    router.visit(url, { preserveScroll: true, preserveState: true });
}

function MyBookItem({ book }: { book: Book }) {
    return (
        <Item variant="outline">
            <ItemMedia variant="icon">
                <BookIcon />
            </ItemMedia>
            <ItemContent className="space-y-2">
                <ItemTitle className="text-xl">
                    <Link href={books.show(book.id)}>{book.title}</Link>
                </ItemTitle>
                <ItemDescription>{book.description}</ItemDescription>
                <ItemFooter>
                    <Badge variant="secondary">${book.price}</Badge>
                    <ItemActions>
                        {book.can?.update && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={books.edit(book.id)}>Edit</Link>
                            </Button>
                        )}

                        {book.can?.delete && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                        Delete
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>
                                        Delete "{book.title}"?
                                    </DialogTitle>
                                    <DialogDescription>
                                        This cannot be undone.
                                    </DialogDescription>

                                    <Form
                                        action={books.destroy.url(book.id)}
                                        method="delete"
                                    >
                                        {({ processing }) => (
                                            <DialogFooter className="gap-2">
                                                <DialogClose asChild>
                                                    <Button variant="secondary">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button
                                                    type="submit"
                                                    variant="destructive"
                                                    disabled={processing}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        )}
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        )}
                    </ItemActions>
                </ItemFooter>
            </ItemContent>
        </Item>
    );
}

export default function MyBooks({
    books: pagedBooks,
}: {
    books: Paginated<Book>;
}) {
    const firstLink = pagedBooks.links[0];
    const lastLink = pagedBooks.links[pagedBooks.links.length - 1];
    const pageLinks = pagedBooks.links.slice(1, -1);

    return (
        <>
            <Head title="My Books" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold">My Books</h1>
                    <Button asChild>
                        <Link href={books.create()}>
                            <BookPlusIcon />
                            Add book
                        </Link>
                    </Button>
                </div>

                {pagedBooks.data.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-md border border-dashed py-16 text-center">
                        <BookIcon className="size-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                            You haven't published any books yet.
                        </p>
                        <Button asChild variant="secondary">
                            <Link href={books.create()}>
                                <BookPlusIcon />
                                Add your first book
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <ItemGroup className="space-y-4">
                            {pagedBooks.data.map((book) => (
                                <Fragment key={book.id}>
                                    <MyBookItem book={book} />
                                </Fragment>
                            ))}
                        </ItemGroup>

                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={firstLink.url ?? '#'}
                                        aria-disabled={!firstLink.url}
                                        className={
                                            !firstLink.url
                                                ? 'pointer-events-none opacity-50'
                                                : undefined
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            visit(firstLink.url);
                                        }}
                                    />
                                </PaginationItem>

                                {pageLinks.map((link, index) =>
                                    link.label === '...' ? (
                                        <PaginationItem
                                            key={`ellipsis-${index}`}
                                        >
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
                                        className={
                                            !lastLink.url
                                                ? 'pointer-events-none opacity-50'
                                                : undefined
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            visit(lastLink.url);
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </>
                )}
            </div>
        </>
    );
}
