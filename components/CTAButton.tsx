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
          el.scrollIntoView({ behavior: "smooth" });
        }
      }}
      variant="primary"
    >
      Get NextNative now
    </Button>
  );
}

export default CTAButton;
