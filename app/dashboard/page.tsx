'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.replace('/auth');
      } else {
        setUserEmail(session.user.email);
        setLoading(false);
      }
    };

    checkSession();
  }, [supabase, router]);

  if (loading) {
    return <p className="p-6">Loading your dashboard...</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-700">Welcome back, <strong>{userEmail}</strong>!</p>
      <p className="mt-2">This will eventually show your enrolled courses, progress, and certificates.</p>
    </main>
  );
}