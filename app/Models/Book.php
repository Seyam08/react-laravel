<?php

namespace App\Models;

use App\Observers\BookObserver;
use Database\Factories\BookFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(BookObserver::class)]
class Book extends Model
{
    /** @use HasFactory<BookFactory> */
    use HasFactory;

    protected $fillable = ['title', 'description', 'price'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
