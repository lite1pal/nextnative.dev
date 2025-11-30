"use client";
import { useState } from "react";

export default function AppRevenueCalculator() {
  const [price, setPrice] = useState(4.99);
  const [users, setUsers] = useState(1000);
  const [appleCut, setAppleCut] = useState(30);
  const [revenueCatCut, setRevenueCatCut] = useState(0);

  const gross = price * users;
  const appleFee = (gross * appleCut) / 100;
  const rcFee = (gross * revenueCatCut) / 100;
  const net = gross - appleFee - rcFee;

  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="mb-3 text-4xl font-bold text-gray-900">
        App Revenue Calculator 💰
      </h1>
      <p className="mb-8 text-gray-600">
        Estimate your profit after App Store and RevenueCat fees. <br />
        Simple, instant, and free.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">Price (USD)</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
            step="0.01"
          />
        </label>
        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">Active Paying Users</span>
          <input
            type="number"
            value={users}
            onChange={(e) => setUsers(+e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
          />
        </label>
        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">
            App Store / Play Store Cut (%)
          </span>
          <input
            type="number"
            value={appleCut}
            onChange={(e) => setAppleCut(+e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
          />
        </label>
        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">RevenueCat Cut (%)</span>
          <input
            type="number"
            value={revenueCatCut}
            onChange={(e) => setRevenueCatCut(+e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-2xl font-semibold">Results</h2>
        <div className="space-y-1 text-left text-gray-700">
          <p>
            <strong>Gross Revenue:</strong> ${gross.toLocaleString()}
          </p>
          <p>
            <strong>App Store Fee ({appleCut}%):</strong> –$
            {appleFee.toLocaleString()}
          </p>
          <p>
            <strong>RevenueCat Fee ({revenueCatCut}%):</strong> –$
            {rcFee.toLocaleString()}
          </p>
          <hr className="my-2 border-gray-300" />
          <p className="text-xl font-bold text-green-600">
            Net Profit: ${net.toLocaleString()}
          </p>
        </div>
      </div>

      <p className="mt-10 text-gray-500">
        Built with ❤️ by{" "}
        <a
          href="https://nextnative.dev"
          className="font-semibold text-green-600 underline hover:text-green-700"
        >
          NextNative.dev
        </a>{" "}
        team.
      </p>
    </div>
  );
}
