// Alternative Authentication Component
// Use this if email confirmation keeps causing issues

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

// Simple demo authentication without Supabase
const AlternativeAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Demo credentials
  const demoUsers = {
    'admin@admin.com': { password: 'admin123', role: 'admin', name: 'Admin User' },
    'user@user.com': { password: 'user123', role: 'client', name: 'Demo User' }
  };

  const handleDemoLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = demoUsers[email as keyof typeof demoUsers];
    
    if (user && user.password === password) {
      // Store demo user in localStorage
      localStorage.setItem('demoUser', JSON.stringify({
        email,
        name: user.name,
        role: user.role,
        id: `demo-${Date.now()}`
      }));

      toast({
        title: "Login Successful!",
        description: `Welcome ${user.name}!`
      });
      
      navigate('/');
    } else {
      setError('Invalid credentials. Use demo accounts: admin@admin.com/admin123 or user@user.com/user123');
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">CCTV Security Store</CardTitle>
          <CardDescription>
            Demo Login (No Email Confirmation Required)
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleDemoLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@admin.com"
                defaultValue="admin@admin.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="admin123"
                defaultValue="admin123"
                required
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Demo Login'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
            <p className="font-semibold mb-2">Demo Accounts (No Signup Required):</p>
            <p><strong>Admin:</strong> admin@admin.com / admin123</p>
            <p><strong>User:</strong> user@user.com / user123</p>
            <p className="text-muted-foreground mt-2">
              This bypasses Supabase authentication for testing
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlternativeAuth;