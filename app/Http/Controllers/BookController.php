<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('user')->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('books/index', [
            'books' => $books,
        ]);
    }

    public function show(Book $book)
    {
        return Inertia::render('books/show', [
            'book' => $book->load('user'),
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

    public function edit(Book $book)
    {
        return Inertia::render('books/edit', [
            'book' => $book,
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        $book->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Book updated successfully.')]);

        return to_route('books.show', $book);
    }

    public function destroy(Book $book)
    {
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
