"use client";

import { trackEvent } from "@/services/custom-analytics";
import Button from "./Button";

function CTAButton() {
  return (
    <Button
      onClick={() => {
        trackEvent("CTA_clicked");
        // window.location.href = dodoPaymentLinks.allAccess;
        const el = document.getElementById("pricing");
        if (el) {
          el.scrollIntoView();
        }
      }}
      variant="primary"
      data-fast-goal="cta_clicked"
    >
      Get NextNative now
    </Button>
  );
}

export default CTAButton;
