<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = User::has('books')
            ->withCount('books')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('authors/index', [
            'authors' => $authors,
        ]);
    }

    public function show(User $author)
    {
        if ($author->books()->doesntExist()) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('authors/show', [
            'author' => $author->load('books.user'),
        ]);
    }
}
