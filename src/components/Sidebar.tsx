import Link from 'next/link';

import SidebarItems from './SidebarItems';
import { Avatar, AvatarFallback } from './ui/avatar';

import { AuthSession, getUserAuth } from '@/lib/auth/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import SignOutBtn from './auth/SignOutBtn';
import UserDetails from './UserDetails';

const Sidebar = async () => {
    const session = await getUserAuth();
    if (session.session === null) return null;

    return (
        <aside className='h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner'>
            <div className='flex flex-col justify-between h-full'>
                <div className='space-y-4'>
                    <h3 className='text-lg font-semibold ml-4'>Logo</h3>
                    <SidebarItems />
                </div>
                <UserDetails session={session} />
            </div>
        </aside>
    );
};

export default Sidebar;


