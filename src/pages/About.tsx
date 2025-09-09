import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Headphones, Truck, Star } from 'lucide-react';

const Stat: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <Card>
    <CardContent className="p-6 flex items-start gap-4">
      <div className="text-primary">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm">{desc}</p>
      </div>
    </CardContent>
  </Card>
);

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-3">About Us</h1>
          <p className="text-muted-foreground">
            We are your trusted partner for professional CCTV and security solutions. From cameras and DVR/NVR systems to networking and accessories, we help
            homes and businesses stay secure with reliable products and support.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Stat icon={<Shield className="h-6 w-6" />} title="Trusted Security" desc="High‑quality, reliable security products you can count on." />
          <Stat icon={<Headphones className="h-6 w-6" />} title="Expert Support" desc="Friendly, knowledgeable support before and after purchase." />
          <Stat icon={<Truck className="h-6 w-6" />} title="Fast Delivery" desc="Quick processing and shipping across major cities." />
          <Stat icon={<Star className="h-6 w-6" />} title="Customer First" desc="We prioritize value, transparency, and satisfaction." />
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            To make advanced security accessible with a curated catalog, clear guidance, and dependable service—so you can focus on what matters most.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
