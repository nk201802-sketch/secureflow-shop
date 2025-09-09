import React from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const Admin: React.FC = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = React.useState<string | null>(null);
  const [fetching, setFetching] = React.useState<boolean>(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
        return;
      }
      (async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();
        if (error) {
          console.error('Failed to fetch profile:', error.message);
        }
        setRole(data?.role || null);
        setFetching(false);
      })();
    }
  }, [user, loading, navigate]);

  const Section: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {loading || fetching ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : !user ? (
          <div />
        ) : role !== 'admin' ? (
          <Card>
            <CardHeader>
              <CardTitle>Unauthorized</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Aap ke paas admin access nahi hai.</p>
              <Button onClick={() => navigate('/')}>Go Home</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Section title="Orders">Recent orders aur status listing yahan dikhayenge (TBD).</Section>
              <Section title="Products">Create/Update products UI yahan add hoga (TBD).</Section>
              <Section title="Categories">Manage categories (TBD).</Section>
              <Section title="Users">Client/Admin roles management (TBD).</Section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
