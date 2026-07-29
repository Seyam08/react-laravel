import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { create, store } from '@/routes/books';
import { Form, Head } from '@inertiajs/react';

export default function BooksCreate() {
    return (
        <>
            <Head title="Add book" />

            <div className="max-w-3xl space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">Add book</h1>
                    <p className="text-sm text-muted-foreground">
                        You'll be listed as the author.
                    </p>
                </div>

                <Form
                    {...store.form()}
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
                                    placeholder="0.00"
                                />
                                <InputError message={errors.price} />
                            </div>

                            <Button type="submit" className="w-fit">
                                {processing && <Spinner />}
                                Create book
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

BooksCreate.layout = {
    breadcrumbs: [
        {
            title: 'Add book',
            href: create().url,
        },
    ],
};
