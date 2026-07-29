import { PublicNav } from '@/components/public-nav/public-nav';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <PublicNav />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
                {children}
            </main>
        </div>
    );
}
