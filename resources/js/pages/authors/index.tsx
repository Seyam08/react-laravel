import { Head } from '@inertiajs/react';
import { Fragment } from 'react';

import { AuthorItem } from '@/components/author-components/author-item';
import { ItemGroup } from '@/components/ui/item';
import type { Author } from '@/types';

export default function AuthorsIndex({
    authors,
}: {
    authors: { data: Author[] };
}) {
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
        </>
    );
}
