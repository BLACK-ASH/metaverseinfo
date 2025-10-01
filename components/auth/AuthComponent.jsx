"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "./auth.context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const AuthComponent = () => {
    const { user, logout } = useAuth();
    return (
        <div>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">{user.name}<ChevronDown className="ml-2 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Button className={"w-full"} variant={"default"} onClick={logout}>Logout</Button>
                    </DropdownMenuContent>

                </DropdownMenu>
            ) : (
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            )}
        </div>
    )
}

export default AuthComponent