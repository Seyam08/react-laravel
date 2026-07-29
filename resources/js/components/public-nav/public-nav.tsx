import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { books } from '@/routes';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Books', href: books() },
    { title: 'About', href: '#' },
    { title: 'Contact', href: '#' },
];

const activeItemStyles =
    'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

export function PublicNav() {
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();

    return (
        <div className="border-b border-sidebar-border/80">
            <div className="mx-auto flex h-16 w-full max-w-7xl justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <AppLogo />
                </Link>

                {/* Desktop Navigation */}
                <div className="ml-6 hidden h-full items-center lg:flex">
                    <NavigationMenu className="flex h-full items-stretch">
                        <NavigationMenuList className="flex h-full items-stretch space-x-2">
                            {navItems.map((item) => (
                                <NavigationMenuItem
                                    key={item.title}
                                    className="relative flex h-full items-center"
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            whenCurrentUrl(
                                                item.href,
                                                activeItemStyles,
                                            ),
                                            'h-9 cursor-pointer px-3',
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                    {isCurrentUrl(item.href) && (
                                        <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white" />
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Mobile Menu */}
                <div className="ml-auto lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64">
                            <SheetHeader>
                                <SheetTitle>Navigation menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col space-y-4 px-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="font-medium"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
}
