import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export const SideNav = () => {
  const session = useSession();
  const user = session.data?.user;
  console.log(user);

  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user !== null && (
          <li>
            <Link href={`/profiles/${user?.id}`}>Profiles</Link>
          </li>
        )}
        {user === undefined ? (
          <li>
            <button onClick={() => void signIn()}>Log In</button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
