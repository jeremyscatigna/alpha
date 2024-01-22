import { getUserAuth } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';

export default async function Home() {
    const { session } = await getUserAuth();

    if (!session) {
        redirect('login');
    }
    return (
        <main className='space-y-4'>
            <div className='p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces'>
                <pre className='bg-secondary p-4 rounded-lg'>{JSON.stringify(session, null, 2)}</pre>
            </div>
        </main>
    );
}
