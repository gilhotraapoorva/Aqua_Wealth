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
export async function getLoanStatus(loanId: string) {
  const res = await fetch(`http://localhost:8080/payments/loan-status?loanId=${loanId}`);
  if (!res.ok) throw new Error("Failed to fetch loan status");
  return res.json();
}


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

export const fetchMeters = async () => {
  const response = await fetch(`${BASE_URL}/meters/all`);
  if (!response.ok) throw new Error("Failed to fetch meters");
  return response.json();
};

// Add a new water meter
export const addWaterMeter = async (meterData: any) => {
  const response = await fetch(`${BASE_URL}/meters/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      meterNumber: meterData.meterNumber,
      installationDate: meterData.installationDate,
      lastReadingDate: meterData.lastReadingDate,
      status: meterData.status,
      user: {
        name: meterData.user.name, // ✅ Match backend
        email: meterData.user.email,
        governmentId: meterData.user.governmentId, // ✅ Include government ID
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add meter");
  }
  return response.json();
};
// ✅ API call to add water usage
// export const addWaterUsage = async (meterId: number, usageData: any) => {
//   const response = await fetch(`${BASE_URL}/usage/add/${meterId}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(usageData),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to add usage");
//   }
//   return response.json();
// };
// In api.ts
// In api.ts
export const addWaterUsage = async (meterId: number, usageData: any) => {
  const response = await fetch(`${BASE_URL}/usage/add/${meterId}`, {  // Updated endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usageData),  // Just send usage data now
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add usage");
  }
  return response.json();
};
// export const addWaterUsage = async (meterId: number, usageData: WaterUsage) => {
//   const response = await fetch(`${BASE_URL}/usage/add/${meterId}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(usageData),
//   });
  
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to add usage");
//   }
//   return response.json();
// };
// export const addWaterUsage = async (usageData: { meterId: number; readingValue: string; readingDate: string }) => {
//   if (!usageData.meterId) {
//     throw new Error("Meter ID is required");
//   }

//   const response = await fetch(`${BASE_URL}/usage/add/${usageData.meterId}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       readingValue: usageData.readingValue,
//       readingDate: usageData.readingDate
//     }),
//   });
  
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to add usage");
//   }
//   return response.json();
// };
// export const addWaterUsage = async (usageData: any) => {
//   // First find the meter ID by meter number
//   const meters = await fetchMeters();
//   const meter = meters.find((m: any) => m.meterNumber === usageData.meterNumber);
  
//   if (!meter) {
//     throw new Error("Meter not found");
//   }

//   const response = await fetch(`${BASE_URL}/usage/add/${meter.id}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       readingValue: usageData.readingValue,
//       readingDate: usageData.readingDate
//     }),
//   });
  
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to add usage");
//   }
//   return response.json();
// };
export const fetchUsageRecords = async () => {
  const response = await fetch(`${BASE_URL}/usage/all`);
  const data = await response.json();
  console.log("API Response:", data); // ✅ Debugging log to check data structure
  return data;
};

export const fetchWaterCredits = async () => {
  const response = await fetch("http://localhost:8080/credits/all");
  if (!response.ok) {
    throw new Error("Failed to fetch water credits");
  }
  return response.json();
};
// Fetch all projects
export async function fetchProjects() {
  try {
    const response = await fetch(`${BASE_URL}/api/projects/all`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Fetch all investments
export async function fetchInvestments() {
  try {
    const response = await fetch(`${BASE_URL}/api/investments/all`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch investments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching investments:", error);
    return [];
  }
}

export async function getInvestmentForm(projectId: number) {
  try {
  //   const response = await fetch(${BASE_URL}/api/investments/form, {
  //     method: "GET",
  //     headers: {
  //         "Authorization": 'Bearer ${token}', // If using JWT auth
  //         "X-Project-ID": String(projectId), // Custom header
  //     }
  // });
  
    const response = await fetch(`${BASE_URL}/api/investments/form/${projectId}, { method: "GET" }`);
    if (!response.ok) throw new Error("Failed to fetch investment form");
    return await response.json();
  } catch (error) {
    console.error("Error fetching investment form:", error);
    throw error;
  }
}

// Submit an investment for a project
export async function submitInvestment(projectId: number, investmentData: any) {
  try {
    const response = await fetch(`${BASE_URL}/api/investments/form/${projectId}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(investmentData),
    });
    if (!response.ok) throw new Error("Failed to submit investment");
    return await response.json();
  } catch (error) {
    console.error("Error submitting investment:", error);
    throw error;
  }
}
