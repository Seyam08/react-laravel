import { BookIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import { useInitials } from '@/hooks/use-initials';
import authors from '@/routes/authors';
import books from '@/routes/books';
import type { Book } from '@/types';
import { Link } from '@inertiajs/react';

export function BookItem({ book }: { book: Book }) {
    const getInitials = useInitials();

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
                    <Badge variant="secondary">${book.price}</Badge>
                </ItemFooter>
            </ItemContent>
        </Item>
    );
}
