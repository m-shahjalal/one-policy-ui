"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { pages } from "@/config/routes";
import { useAuth } from "@/hooks/use-auth";
import { User as UserType } from "@/lib/type";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  LogOut,
  MenuIcon,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ui/theme-toggle";

const NavLink = ({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer hover:bg-white/20 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-200 ${className}`}
    prefetch={false}
    onClick={onClick}
  >
    {children}
  </Link>
);

const UserAvatar = ({ user }: { user: UserType | null }) => {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "U";

  return (
    <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
      <AvatarImage src={""} alt={user?.name || "User"} />
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

const MobileMenu = ({
  links,
  user,
  handleLogout,
}: {
  links: { label: string; href: string; icon?: React.ElementType }[];
  user: UserType | null;
  handleLogout: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/20 dark:hover:bg-gray-800/30"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 backdrop-blur-lg p-4 bg-white/90 dark:bg-gray-900/90 border-r border-gray-200 dark:border-gray-800"
      >
        <div className="flex justify-between items-center">
          <SheetTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            OnePolicy
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <span className="sr-only">Close menu</span>
            </Button>
          </SheetClose>
        </div>

        <div className="flex flex-col h-full">
          {user?.email && (
            <div className="px-2 py-4 mb-4 mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <UserAvatar user={user} />
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!user?.email && (
            <div className="px-2 py-3 mb-2 mt-0 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Generate your legal pages in seconds with our easy-to-use
                platform.
              </p>
            </div>
          )}

          <nav className="flex-1 flex flex-col gap-y-1 mt-2">
            {links.map((link) => {
              const Icon = link.icon || ChevronRight;
              return (
                <SheetClose asChild key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>{link.label}</span>
                  </Link>
                </SheetClose>
              );
            })}

            {user?.email ? (
              <>
                <SheetClose asChild key="dashboard">
                  <Link
                    href={pages.dashboard.index}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>Dashboard</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild key="logout">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mt-2"
                  >
                    <LogOut className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>Logout</span>
                  </button>
                </SheetClose>
              </>
            ) : (
              <>
                <SheetClose asChild key="login">
                  <Link
                    href={pages.auth.login}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>Login</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild key="start">
                  <Button className="ml-2 mt-4 bg-gradient-to-r h-10 from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                    <Link href={pages.auth.signup}>Join Now</Link>
                  </Button>
                </SheetClose>
              </>
            )}
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 px-2 dark:text-gray-400">
                © 2025 OnePolicy
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const DesktopNav = ({
  links,
  user,
  handleLogout,
}: {
  links: { label: string; href: string; icon?: React.ElementType }[];
  user: UserType | null;
  handleLogout: () => void;
}) => {
  return (
    <nav className="hidden lg:flex lg:items-center lg:space-x-1">
      {links.map((link) => (
        <NavLink key={link.label} href={link.href}>
          {link.label}
        </NavLink>
      ))}
      <div className="ml-4 flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-4">
        <ThemeToggle />

        {user?.email ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-1 pr-2"
              >
                <UserAvatar user={user} />
                <span className="text-sm font-medium hidden md:inline-block">
                  {user?.name?.split(" ")[0]}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={pages.dashboard.index} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button
              variant="ghost"
              className="text-gray-700 dark:text-gray-200"
            >
              <Link href={pages.auth.login}>Login</Link>
            </Button>
            <Button className="bg-gradient-to-r h-10 from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              <Link href={pages.auth.signup}>Join Now</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  const links = [
    { label: "Home", href: pages.home, icon: Shield },
    { label: "Features", href: pages.features, icon: FileText },
    { label: "Contact", href: pages.contact, icon: FileText },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4">
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className={`max-w-[1248px] mx-auto mt-4 ${
          scrolled ? "h-14" : "h-16"
        } transition-all duration-200 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-md dark:shadow-gray-950/20 border border-gray-200/30 dark:border-gray-800/30`}
      >
        <div className="relative flex items-center justify-between h-full px-4 rounded-2xl">
          <div className="flex items-center lg:hidden">
            <MobileMenu handleLogout={logout} user={user} links={links} />
          </div>

          <div className="flex-1 flex items-center justify-center lg:justify-start">
            <Link
              href={pages.home}
              className="flex items-center gap-1 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400"
            >
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              OnePolicy
            </Link>
          </div>

          <DesktopNav handleLogout={logout} user={user} links={links} />
        </div>
      </motion.div>
    </header>
  );
}
