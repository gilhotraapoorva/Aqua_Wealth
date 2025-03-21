const BASE_URL = "http://localhost:8080";

export const applyForLoan = async (loanData: any) => {
  const response = await fetch(`${BASE_URL}/loans/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        governmentId: loanData.governmentId,
        name: loanData.name,  
        email: loanData.email, 
      },
      amount: loanData.amount,
      collateral: loanData.collateral,
      collateralDetails: loanData.collateralDetails,
      purpose: loanData.purpose,
      termMonths: loanData.termMonths,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to apply for loan");
  }

  return response.json();
};

export const makeLoanPayment = async (paymentData: any) => {
  const response = await fetch(`${BASE_URL}/payments/process-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      loanId: paymentData.loanId,
      amount: paymentData.amount,
      paymentType: paymentData.paymentType,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to process payment");
  }

  return response.json();
};
export const applyForInsurance = async (policyData: any) => {
  const response = await fetch(`${BASE_URL}/insurance/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        name: policyData.userName, // Corrected nesting
        email: policyData.email,   // Corrected nesting
      },
      governmentId: policyData.governmentId,
      coverageType: policyData.coverageType,
      coverageAmount: policyData.coverageAmount,
      premiumAmount: policyData.coverageAmount / 30, // Calculating premium
      startDate: policyData.startDate,
      endDate: new Date(new Date(policyData.startDate).setFullYear(new Date(policyData.startDate).getFullYear() + 1)).toISOString().split("T")[0], // Auto-calculate end date
      status: "ACTIVE",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to apply for insurance");
  }

  return response.json();
};

export const submitClaim = async (claimData: any) => {
  const response = await fetch(`${BASE_URL}/insurance/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      governmentId: claimData.governmentId,
      city: claimData.city,
      date: claimData.date,
      claimAmount: claimData.claimAmount,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit claim");
  }

  return response.json();
};
