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

      if (!termsAccepted) {
        setShowTerms(true);
        return;
      }

      if (leadSubmitted && userEmail) {
        try {
          const leads = await base44.entities.Lead.filter({ email: userEmail });
          if (leads.length > 0) {
            setIsReady(true);
            return;
          }
        } catch (error) {
          console.error('Error checking lead:', error);
        }
      }

      if (!leadSubmitted) {
        const leads = await base44.entities.Lead.list();
        if (leads.some(l => l.email === userEmail)) {
          setShowLogin(true);
        } else {
          setShowLeadForm(true);
        }
      } else {
        setIsReady(true);
      }
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