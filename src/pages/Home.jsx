import React from "react";
import HeroSection from "../components/celeiro/HeroSection";
import AboutSection from "../components/celeiro/AboutSection";
import SpacesSection from "../components/celeiro/SpacesSection";
import CoursesSection from "../components/celeiro/CoursesSection";
import TeachersSection from "../components/celeiro/TeachersSection";
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
        <CoursesSection />
        <TeachersSection />
        <ContactSection />
        <Footer />
      </div>
    </AccessGate>
  );
}