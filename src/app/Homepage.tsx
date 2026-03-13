import Hero from "./components/hero/Hero";
import Features from "./components/features/Features";
import Services from "./components/services/Services";
import Works from "./components/works/Works";
import Process from "./components/process/Process";
import Pricing from "./components/pricing/Pricing";
import ContactCTA from "./components/contact/ContactCTA";

export default function HomePage({ locale }: { locale: 'hu' | 'en' }) {
  return (
    <>
      <Hero locale={locale} />
      <Features locale={locale} />
      <Services locale={locale} />
      <Works locale={locale} />
      <Process locale={locale} />
      <Pricing locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}
