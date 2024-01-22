'use client';

import { AuthSession } from '@/lib/auth/utils';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback } from './ui/avatar';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const UserDetails = ({ session }: { session: AuthSession }) => {
    if (session.session === null) return null;
    const { user } = session.session;

    if (!user?.name || user.name.length == 0) return null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='default' className='space-x-2'>
                    <div className='text-background'>
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
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='grid gap-2'>
                    <Link href={'/account'}>Account</Link>
                    <div className='cursor-pointer' onClick={() => signOut()}>Sign out</div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default UserDetails;
