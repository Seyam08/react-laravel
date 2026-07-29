import type { Book } from './book-types';
import type { User } from './auth';

export type Author = User & {
    books_count?: number;
    books?: Book[];
};
