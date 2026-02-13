import React, { useState, useEffect } from "react";
import TermsModal from "./TermsModal";
import LeadCaptureForm from "./LeadCaptureForm";
import LoginForm from "./LoginForm";
import { base44 } from "@/api/base44Client";

export default function AccessGate({ children }) {
  const [showTerms, setShowTerms] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const termsAccepted = localStorage.getItem('celeiro_terms_accepted');
      const leadSubmitted = localStorage.getItem('celeiro_lead_submitted');
      const userEmail = localStorage.getItem('celeiro_user_email');

      // Se não aceitou termos, mostra modal de termos
      if (!termsAccepted) {
        setShowTerms(true);
        return;
      }

      // Se já preencheu o formulário antes (tem flag de submitted), libera acesso direto
      if (leadSubmitted === 'true') {
        setIsReady(true);
        return;
      }

      // Se não tem flag de submitted, mostra formulário de cadastro
      setShowLeadForm(true);
    }
    checkAccess();
  }, []);

  const handleTermsAccept = () => {
    localStorage.setItem('celeiro_terms_accepted', 'true');
    setShowTerms(false);
    setShowLeadForm(true);
  };

  const handleLeadComplete = () => {
    setShowLeadForm(false);
    setIsReady(true);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setIsReady(true);
  };

  if (!isReady) {
    return (
      <>
        {showTerms && <TermsModal onAccept={handleTermsAccept} />}
        {showLogin && <LoginForm onSuccess={handleLoginSuccess} />}
        {showLeadForm && <LeadCaptureForm onComplete={handleLeadComplete} />}
      </>
    );
  }

  return children;
}