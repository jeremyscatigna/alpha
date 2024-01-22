
import Upload from "@/components/Upload";
import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="space-y-4">
      {session ? (
        <div className="p-4 rounded-sm shadow-sm text-secondary-foreground break-all whitespace-break-spaces">
          <pre className="bg-secondary p-4 rounded-lg">{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : null}
      <SignIn />
    </main>
  );
}
