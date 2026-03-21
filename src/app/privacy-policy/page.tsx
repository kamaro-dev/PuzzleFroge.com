import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow py-20 px-4">
        <div className="container mx-auto max-w-3xl bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:mb-6 prose-p:text-slate-600 prose-lg">
            <p>
              At Puzzlfo, we respect your privacy.
            </p>
            <p>
              We do not collect personal information unless you choose to provide it. We may use basic analytics tools to understand how users interact with the site in order to improve our services.
            </p>
            <p>
              Cookies may be used to improve user experience and for advertising purposes (such as Google AdSense). These cookies help serve relevant ads based on your prior visits to our website or other websites.
            </p>
            <p>
              By using this website, you agree to this policy. We reserve the right to modify this privacy policy at any time, so please review it frequently.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
