<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = User::where('role', Role::Author)
            ->withCount('books')
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('authors/index', [
            'authors' => $authors,
        ]);
    }

    public function show(User $author)
    {
        if ($author->role !== Role::Author) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('authors/show', [
            'author' => $author->load('books.user'),
        ]);
    }
}
