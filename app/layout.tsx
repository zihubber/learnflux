// File: app/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserEmail(session?.user?.email ?? null);
    };
    getSession();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    router.refresh();
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <div className="font-bold text-xl">LearnFlux</div>
          <div>
            {userEmail ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">Hello, {userEmail}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/auth"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Log in / Sign up
              </a>
            )}
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

// Other files remain unchanged

