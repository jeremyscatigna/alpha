'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { Icons } from '../ui/icons';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Button
                variant='outline'
                type='button'
                disabled={isLoading}
                onClick={() =>
                    signIn('google', {
                        callbackUrl: '/',
                    })
                }
            >
                {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Icons.google className='mr-2 h-4 w-4' />} Google
            </Button>
        </div>
    );
}
