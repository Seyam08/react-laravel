import type { User } from './auth';
import type { Book } from './book-types';

export type Author = User & {
    books_count?: number;
    books?: Book[];
};
