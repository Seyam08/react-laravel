import { Form, Link } from '@inertiajs/react';
import { ArrowLeftIcon, BookIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useInitials } from '@/hooks/use-initials';
import authors from '@/routes/authors';
import books from '@/routes/books';
import type { Book } from '@/types';

export function BookCard({ book }: { book: Book }) {
    const getInitials = useInitials();

    return (
        <div className="space-y-6">
            <Link
                href={books.index()}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeftIcon className="size-4" />
                Back to books
            </Link>

            <div className="flex items-start gap-4 border-b pb-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <BookIcon className="size-7 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            {book.title}
                        </h1>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-base">
                                ${book.price}
                            </Badge>

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
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 overflow-hidden rounded-full">
                            <AvatarImage
                                src={book.user.avatar}
                                alt={book.user.name}
                            />
                            <AvatarFallback className="rounded-full bg-neutral-200 text-[10px] text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(book.user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                            <Link
                                href={authors.show(book.user.id)}
                                className="hover:underline"
                            >
                                {book.user.name}
                            </Link>
                        </span>
                    </div>
                </div>
            </div>

            <p className="max-w-2xl leading-relaxed text-foreground">
                {book.description}
            </p>
        </div>
    );
}
