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
