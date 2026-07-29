import { Link } from '@inertiajs/react';
import { UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import { useInitials } from '@/hooks/use-initials';
import authors from '@/routes/authors';
import type { Author } from '@/types';

export function AuthorItem({ author }: { author: Author }) {
    const getInitials = useInitials();

    return (
        <Item variant="outline">
            <ItemMedia variant="icon">
                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback className="rounded-full bg-neutral-200 text-xs text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(author.name)}
                    </AvatarFallback>
                </Avatar>
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="text-xl">
                    <Link href={authors.show(author.id)}>{author.name}</Link>
                </ItemTitle>
            </ItemContent>
            <ItemActions>
                <Badge variant="secondary">
                    <UserIcon className="size-3" />
                    {author.books_count ?? 0} books
                </Badge>
            </ItemActions>
        </Item>
    );
}
