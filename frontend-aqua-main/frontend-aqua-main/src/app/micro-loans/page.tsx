"use client";

import Link from "next/link";

export default function MicroLoansHome() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl rounded bg-white p-8 shadow">
        <h1 className="text-3xl font-bold mb-4">Micro Loans</h1>
        <p className="mb-6">
          Our Micro Loans service provides financial assistance to individuals in need. 
          These loans are designed to help you overcome short-term financial hurdles with minimal paperwork 
          and flexible repayment options.
        </p>

        <div className="space-y-6">
          {/* Apply for Loan */}
          <div>
            <Link
              href="/micro-loans/apply"
              className="inline-block rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Apply for Loan
            </Link>
            <p className="mt-2 text-sm text-gray-700">
              Easily submit your loan application by providing essential details such as your income, 
              collateral information, and the loan amount required. Our system evaluates your application 
              based on your financial need and repayment capability to give you a quick decision.
            </p>
          </div>

          {/* Loan Status */}
          <div>
            <Link
              href="/micro-loans/status"
              className="inline-block rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
            >
              Loan Status
            </Link>
            <p className="mt-2 text-sm text-gray-700">
              Check the current status of your loan application in real time. Whether your loan is approved, 
              pending, or needs additional documentation, this page keeps you up to date on every step of the process.
            </p>
          </div>

          {/* Repayment */}
          <div>
            <Link
              href="/micro-loans/repayment"
              className="inline-block rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700"
            >
              Repayment
            </Link>
            <p className="mt-2 text-sm text-gray-700">
              View and manage your loan repayment details. This page allows you to record new payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
