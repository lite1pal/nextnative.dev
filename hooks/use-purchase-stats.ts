"use client";

import { useEffect, useState } from "react";

function usePurchaseStats() {
  const [customersCount, setCustomersCount] = useState(20);
  const [discountLimit, setDiscountLimit] = useState(25);
  const [discount, setDiscount] = useState(50);
  const [pricing, setPricing] = useState({
    starter: 98,
    allIn: 125,
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomersCount = async () => {
      try {
        const response = await fetch("/api/customers-count");
        if (!response.ok) {
          throw new Error("Failed to fetch customers count");
        }
        const data = await response.json();
        const count = data.count || 0;

        setCustomersCount(count);

        const nextLimit = Math.ceil((count + 1) / 5) * 5;
        setDiscountLimit(nextLimit);
      } catch (error) {
        console.error("Error fetching customers count:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomersCount();
  }, []);

  return {
    customersCount,
    discountLimit,
    discount,
    pricing,
    isError,
    isLoading,
  };
}

export default usePurchaseStats;
