"use client";

import React from "react";
import { PlanCard, PlanCardProps } from "@/components/cards/PlanCard";

type PlanGroup = {
  label: string;
  plans: PlanCardProps[];
};

const pricingGroups: PlanGroup[] = [
  {
    label: "STAFF",
    plans: [
      {
        id: "staff-basic",
        name: "Basic plan",
        price: "$9.99",
        period: "/month",
        features: [
          { label: "Verified professional profile", included: true },
          { label: "Apply to open roles", included: true },
          { label: "Upload CV & certifications", included: true },
          { label: "Profile views tracker", included: true },
          { label: "Priority in recruiter searches", included: false },
          { label: "Advanced analytics dashboard", included: false },
        ],
      },
      {
        id: "staff-gold",
        name: "Gold plan",
        price: "$39.99",
        period: "/month",
        badge: "Most popular",
        highlight: true,
        features: [
          { label: "Everything in Basic", included: true },
          { label: "Priority in recruiter searches", included: true },
          { label: "Advanced analytics dashboard", included: true },
          { label: "Direct club & agent messaging", included: true },
          { label: "Webinars & career events access", included: true },
          { label: "AI profile optimization feedback", included: true },
        ],
      },
    ],
  },
  {
    label: "AMATEUR PLAYER",
    plans: [
      {
        id: "amateur-basic",
        name: "Basic plan",
        price: "$0",
        period: "/month",
        badge: "Free",
        features: [
          { label: "Create a public profile", included: true },
          { label: "Apply to amateur opportunities", included: true },
          { label: "Upload 1 highlight video", included: true },
          { label: "AI profile score & feedback", included: true },
          { label: "Priority visibility", included: false },
        ],
      },
      {
        id: "amateur-silver",
        name: "Silver plan",
        price: "$9.99",
        period: "/month",
        features: [
          { label: "Everything in Basic", included: true },
          { label: "Multiple video uploads", included: true },
          { label: "Profile views tracker", included: true },
          { label: "Job alerts & saved searches", included: true },
          { label: "AI-driven PRO score boost", included: false },
        ],
      },
      {
        id: "amateur-gold",
        name: "Gold plan",
        price: "$29.99",
        period: "/month",
        badge: "Most popular",
        highlight: true,
        features: [
          { label: "Everything in Silver", included: true },
          { label: "AI-driven PRO score boost", included: true },
          { label: "Personality & behavioral profile", included: true },
          { label: "Global exposure to clubs", included: true },
          { label: "Direct messaging with agents", included: true },
        ],
      },
    ],
  },
  {
    label: "PRO PLAYER",
    plans: [
      {
        id: "pro-basic",
        name: "Basic plan",
        price: "$9.99",
        period: "/month",
        features: [
          { label: "Verified pro profile", included: true },
          { label: "Apply to pro roles", included: true },
          { label: "CV & stats upload", included: true },
          { label: "Video session analysis", included: true },
          { label: "AI performance report", included: false },
        ],
      },
      {
        id: "pro-silver",
        name: "Silver plan",
        price: "$29.99",
        period: "/month",
        features: [
          { label: "Everything in Basic", included: true },
          { label: "Video session analysis", included: true },
          { label: "Shortlist & trial alerts", included: true },
          { label: "Network with clubs & agents", included: true },
          { label: "Spotlight placement", included: false },
        ],
      },
      {
        id: "pro-gold",
        name: "Gold plan",
        price: "$59.99",
        period: "/month",
        badge: "Most popular",
        highlight: true,
        features: [
          { label: "Everything in Silver", included: true },
          { label: "AI performance report", included: true },
          { label: "Spotlight placement", included: true },
          { label: "Psychometric profiling", included: true },
          { label: "Early access to premium jobs", included: true },
        ],
      },
    ],
  },
];

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl bg-blue-700 py-3 text-center text-lg font-semibold text-white shadow">
          Jobsoccer - Pricing Plans
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Candidates
          </h2>

          {pricingGroups.map((group) => (
            <section key={group.label} className="mt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {group.label}
              </h3>
              <div
                className={`mt-3 grid gap-4 ${
                  group.plans.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
                }`}
              >
                {group.plans.map((plan) => (
                  <PlanCard key={plan.id} {...plan} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Employers
          </h2>
        </div>
      </div>
    </div>
  );
}
