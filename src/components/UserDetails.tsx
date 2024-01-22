"use client"

import { AuthSession } from "@/lib/auth/utils";
import { Select, SelectContent, SelectTrigger } from "./ui/select";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";

const UserDetails = ({ session }: { session: AuthSession }) => {
    if (session.session === null) return null;
    const { user } = session.session;

    if (!user?.name || user.name.length == 0) return null;

    return (
        <Select>
            <SelectTrigger>
                <div className='text-muted-foreground space-x-2 flex items-center px-2 py-2 '>
                    <div className='text-muted-foreground'>
                        <p className='text-xs font-semibold'>{user.name ?? 'John Doe'}</p>
                    </div>
                    <Avatar className='h-8 w-8 bg-background'>
                        <AvatarFallback className='border-border border-2 text-muted-foreground bg-background'>
                            {user.name
                                ? user.name
                                      ?.split(' ')
                                      .map((word) => word[0].toUpperCase())
                                      .join('')
                                : '~'}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </SelectTrigger>
            <SelectContent>
                <div className='relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted'>
                    <Link href={'/account'}>Account</Link>
                </div>
                <div onClick={() => signOut()} className='relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted'>
                    Sign out
                </div>
            </SelectContent>
        </Select>
    );
};

export default UserDetails;