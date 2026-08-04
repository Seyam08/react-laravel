import type { User } from './auth';

export type Book = {
    id: number;
    title: string;
    description: string;
    price: string;
    user_id: number;
    user: User;
    created_at: string;
    updated_at: string;
    can?: {
        update: boolean;
        delete: boolean;
    };
};
