import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { update } from '@/routes/books';
import type { Book } from '@/types';
import { Form, Head } from '@inertiajs/react';

export default function BooksEdit({ book }: { book: Book }) {
    return (
        <>
            <Head title={`Edit ${book.title}`} />

            <div className="max-w-3xl space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">Edit book</h1>
                </div>

                <Form
                    {...update.form(book.id)}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    required
                                    autoFocus
                                    defaultValue={book.title}
                                    placeholder="Book title"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows={6}
                                    defaultValue={book.description}
                                    placeholder="What's the book about?"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    required
                                    defaultValue={book.price}
                                    placeholder="0.00"
                                />
                                <InputError message={errors.price} />
                            </div>

                            <Button type="submit" className="w-fit">
                                {processing && <Spinner />}
                                Save changes
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
