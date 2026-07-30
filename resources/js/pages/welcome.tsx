import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, Library, Sparkles, Users } from 'lucide-react';

import { PublicNav } from '@/components/public-nav/public-nav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard, register } from '@/routes';
import authors from '@/routes/authors';
import books from '@/routes/books';

const features = [
    {
        icon: Library,
        title: 'Curated catalog',
        description:
            'Browse a growing collection of books spanning fiction, non-fiction, and everything in between.',
    },
    {
        icon: Users,
        title: 'Author profiles',
        description:
            'Get to know the people behind the pages, from debut writers to seasoned novelists.',
    },
    {
        icon: Sparkles,
        title: 'Always expanding',
        description:
            'New titles and authors are added regularly, so there is always something new to discover.',
    },
];

const genres = [
    'Fiction',
    'Sci-Fi',
    'Biography',
    'Poetry',
    'Mystery',
    'History',
];

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <PublicNav />

            <div className="bg-background">
                <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
                    <div className="flex flex-col gap-6">
                        <Badge variant="secondary" className="w-fit">
                            Open library
                        </Badge>
                        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            Every book has an author. Meet both.
                        </h1>
                        <p className="max-w-lg text-lg text-muted-foreground">
                            A simple, searchable library of books and the
                            authors who wrote them. Browse titles, explore
                            author profiles, and find what to read next.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild size="lg">
                                <Link href={books.index()}>
                                    <BookOpen data-icon="inline-start" />
                                    Browse books
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href={authors.index()}>
                                    <Users data-icon="inline-start" />
                                    Meet the authors
                                </Link>
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {genres.map((genre) => (
                                <Badge key={genre} variant="outline">
                                    {genre}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="flex h-72 w-full max-w-sm items-end justify-center gap-3 sm:h-80">
                            <div className="h-[85%] w-16 rounded-t-md bg-primary shadow-lg sm:w-20" />
                            <div className="h-full w-16 rounded-t-md bg-secondary shadow-lg sm:w-20" />
                            <div className="flex h-[70%] w-16 items-start justify-center rounded-t-md bg-accent pt-4 shadow-lg sm:w-20">
                                <BookOpen className="size-8 text-accent-foreground" />
                            </div>
                            <div className="h-[92%] w-16 rounded-t-md bg-muted shadow-lg sm:w-20" />
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-7xl px-4 py-16">
                    <div className="grid gap-6 sm:grid-cols-3">
                        {features.map((feature) => (
                            <Card key={feature.title}>
                                <CardHeader className="gap-3">
                                    <feature.icon className="size-6 text-primary" />
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="mx-auto w-full max-w-7xl px-4 py-16">
                    <Card className="items-center p-10 text-center">
                        <CardHeader className="items-center gap-2 px-0">
                            <CardTitle className="text-2xl">
                                {auth.user
                                    ? 'Jump back into your library'
                                    : 'Ready to start exploring?'}
                            </CardTitle>
                            <CardDescription className="max-w-md text-base">
                                {auth.user
                                    ? 'Head to your dashboard to manage your books and keep the catalog growing.'
                                    : 'Create a free account to keep track of your favorite books and authors.'}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="px-0">
                            <Button asChild size="lg">
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                >
                                    {auth.user
                                        ? 'Go to dashboard'
                                        : 'Create your account'}
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </section>
            </div>
        </>
    );
}
