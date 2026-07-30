<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::whereHas('user', fn($query) => $query->where('role', Role::Author))->with('user')->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('books/index', [
            'books' => $books,
        ]);
    }

    public function show(Request $request, Book $book)
    {
        return Inertia::render('books/show', [
            'book' => $book->load('user'),
            'can' => [
                'delete' => $request->user()?->can('delete', $book) ?? false,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('books/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        $book = $request->user()->books()->create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Book created successfully.')]);

        return to_route('books.show', $book);
    }

    public function destroy(Book $book)
    {
        $this->authorize('delete', $book);
        $book->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Book deleted successfully.')]);

        return to_route('books.index');
    }

    public function myBooks(Request $request)
    {
        $books = $request->user()->books()->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('books/my-books', [
            'books' => $books,
        ]);
    }
}
