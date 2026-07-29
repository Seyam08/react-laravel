import { Link } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import authors from '@/routes/authors';
import { useInitials } from '@/hooks/use-initials';
import type { Author } from '@/types';

export function AuthorCard({ author }: { author: Author }) {
    const getInitials = useInitials();

    return (
        <div className="space-y-6">
            <Link
                href={authors.index()}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeftIcon className="size-4" />
                Back to authors
            </Link>

            <div className="flex items-start gap-4 border-b pb-6">
                <Avatar className="size-14 shrink-0 overflow-hidden rounded-lg">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-lg text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(author.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-3xl font-semibold tracking-tight">
                            {author.name}
                        </h1>
                        <Badge variant="secondary" className="text-base">
                            {author.books?.length ?? 0} books
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {author.email}
                    </p>
                </div>
            </div>
        </div>
    );
}
