import React, { useState, useEffect } from "react";
import TermsModal from "./TermsModal";
import LeadCaptureForm from "./LeadCaptureForm";

export default function AccessGate({ children }) {
  const [showTerms, setShowTerms] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const termsAccepted = localStorage.getItem('celeiro_terms_accepted');
    const leadSubmitted = localStorage.getItem('celeiro_lead_submitted');

    if (!termsAccepted) {
      setShowTerms(true);
    } else if (!leadSubmitted) {
      setShowLeadForm(true);
    } else {
      setIsReady(true);
    }
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

  if (!isReady) {
    return (
      <>
        {showTerms && <TermsModal onAccept={handleTermsAccept} />}
        {showLeadForm && <LeadCaptureForm onComplete={handleLeadComplete} />}
      </>
    );
  }

  return children;
}