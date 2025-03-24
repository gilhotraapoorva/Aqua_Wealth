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
export const getPendingAmount = async (loanId: string) => {
  const response = await fetch(`${BASE_URL}/payments/pending-amount?loanId=${loanId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch pending amount");
  }
  const data = await response.json();
  return data; // Return full response (contains { success, pendingAmount })
};
// export const getPaymentHistory = async (loanId: string) => {
//   const response = await fetch(`${BASE_URL}/payments/payment-history?loanId=${loanId}`);

//   if (!response.ok) {
//     console.error("Failed to fetch payment history");
//     return []; // ✅ Returns empty array instead of undefined
//   }

//   return response.json();
// };

export const getPaymentHistory = async (loanId: string) => {
  const response = await fetch(`${BASE_URL}/payments/payment-history?loanId=${loanId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch payment history");
  }
  const data = await response.json();
  return data; // Return full response (contains { success, paymentHistory })
};

// export async function getPendingAmount(loanId: string) {
//   try {
//     const response = await fetch(`/payments/pending-amount?loanId=${loanId}`);
//     const data = await response.json();
//     if (!data.success) throw new Error(data.message);
//     return data.pendingAmount; // Returns the pending amount
//   } catch (error) {
//     console.error("Error fetching pending amount:", error);
//     throw error;
//   }
// }

// export async function getPaymentHistory(loanId: string) {
//   try {
//     const response = await fetch(`/payments/payment-history?loanId=${loanId}`);
//     const data = await response.json();
//     if (!data.success) throw new Error(data.message);
//     return data.paymentHistory; // Returns the payment history array
//   } catch (error) {
//     console.error("Error fetching payment history:", error);
//     throw error;
//   }
// }
