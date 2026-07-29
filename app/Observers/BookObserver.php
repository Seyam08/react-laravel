<?php

namespace App\Observers;

use App\Enums\Role;
use App\Models\Book;

class BookObserver
{
    /**
     * Handle the Book "created" event.
     */
    public function created(Book $book): void
    {
        $user = $book->user;

        if ($user->role !== Role::Author) {
            $user->update(['role' => Role::Author]);
        }
    }
}
