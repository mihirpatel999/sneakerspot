import React from 'react'

export const Thanku = () => {
  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Thank You!</h2>
        <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => window.location.href = "/"}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}


