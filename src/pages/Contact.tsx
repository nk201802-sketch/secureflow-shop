import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.message) return;
    try {
      setLoading(true);
      // Demo-only: yahan normally backend/API ko post hota.
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
      setValues({ name: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Kisi bhi sawal ya quotation ke liye form bharain ya neeche diye gaye contact details par rabta karein.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              {submitted ? (
                <div className="p-4 rounded-md bg-green-50 text-green-700 dark:bg-emerald-950/40 dark:text-emerald-300 mb-6">
                  Shukriya! Aapka paigham mil gaya hai. Hum jald raabta karenge.
                </div>
              ) : null}

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input name="name" value={values.name} onChange={onChange} placeholder="Aapka naam" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" name="email" value={values.email} onChange={onChange} placeholder="you@example.com" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea name="message" value={values.message} onChange={onChange} placeholder="Apna paigham likhein..." rows={6} required />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-muted-foreground text-sm">support@example.com</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-muted-foreground text-sm">+92 300 0000000</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-muted-foreground text-sm">Main Boulevard, Lahore, Pakistan</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
