import React from "react";
import HeroSection from "../components/celeiro/HeroSection";
import AboutSection from "../components/celeiro/AboutSection";
import SpacesSection from "../components/celeiro/SpacesSection";
import EscolaSection from "../components/celeiro/EscolaSection";
import QuemSomos from "../components/celeiro/QuemSomos";
import OperatingHoursSection from "../components/celeiro/OperatingHoursSection";
import SubscriptionPlans from "../components/celeiro/SubscriptionPlans";
import AgencySection from "../components/celeiro/AgencySection";
import QRCodeSection from "../components/celeiro/QRCodeSection";
import ContactSection from "../components/celeiro/ContactSection";
import Footer from "../components/celeiro/Footer";
import CitySelector from "../components/celeiro/CitySelector";
import AccessGate from "../components/celeiro/AccessGate";

export default function Home() {
  return (
    <AccessGate>
      <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
        <CitySelector />
        <HeroSection />
        <AboutSection />
        <SpacesSection />
        <EscolaSection />
        <QuemSomos />
        <OperatingHoursSection />
        <SubscriptionPlans />
        <AgencySection />
        <QRCodeSection />
        <ContactSection />
        <Footer />
      </div>
    </AccessGate>
  );
}