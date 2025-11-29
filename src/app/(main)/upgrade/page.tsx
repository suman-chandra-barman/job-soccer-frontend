"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Star,
  Zap,
  Crown,
  Mail,
  Target,
  FileText,
  Eye,
  Trophy,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Types for the pricing data
interface PricingFeature {
  id: string;
  name: string;
  included: boolean;
  icon?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  period: string;
  recommended?: boolean;
  popular?: boolean;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant?: "default" | "secondary" | "outline";
}

interface PricingData {
  title: string;
  subtitle: string;
  description: string;
  plans: PricingPlan[];
}

// Icon mapping for features
const featureIcons = {
  email: Mail,
  recommendations: Target,
  applications: FileText,
  insights: Eye,
  badge: Trophy,
  default: Check,
};

// Mock API call - replace with your actual API
const fetchPricingData = async (): Promise<PricingData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    title: "Plans and Pricing",
    subtitle: "Receive unlimited credits when you pay yearly,",
    description: "and save on your plan",
    plans: [
      {
        id: "monthly",
        name: "Monthly",
        description: "Best for trying out",
        price: 29,
        currency: "$",
        period: "per month",
        features: [
          {
            id: "1",
            name: "Free e-mail alerts",
            included: true,
            icon: "email",
          },
          {
            id: "2",
            name: "Automatic job recommendations",
            included: true,
            icon: "recommendations",
          },
          {
            id: "3",
            name: "Unlimited job applications",
            included: true,
            icon: "applications",
          },
          { id: "4", name: "Job insights", included: true, icon: "insights" },
          {
            id: "5",
            name: "Top applicant badge",
            included: true,
            icon: "badge",
          },
        ],
        buttonText: "Get started for free",
        buttonVariant: "outline",
      },
      {
        id: "half-yearly",
        name: "Half-yearly",
        description: "Most popular choice",
        price: 120,
        currency: "$",
        period: "every six months",
        recommended: true,
        popular: true,
        features: [
          {
            id: "1",
            name: "Free e-mail alerts",
            included: true,
            icon: "email",
          },
          {
            id: "2",
            name: "Automatic job recommendations",
            included: true,
            icon: "recommendations",
          },
          {
            id: "3",
            name: "Unlimited job applications",
            included: true,
            icon: "applications",
          },
          { id: "4", name: "Job insights", included: true, icon: "insights" },
          {
            id: "5",
            name: "Top applicant badge",
            included: true,
            icon: "badge",
          },
        ],
        buttonText: "Get started for free",
        buttonVariant: "default",
      },
      {
        id: "yearly",
        name: "Yearly",
        description: "Best value for money",
        price: 190,
        originalPrice: 348,
        currency: "$",
        period: "per year",
        features: [
          {
            id: "1",
            name: "Free e-mail alerts",
            included: true,
            icon: "email",
          },
          {
            id: "2",
            name: "Automatic job recommendations",
            included: true,
            icon: "recommendations",
          },
          {
            id: "3",
            name: "Unlimited job applications",
            included: true,
            icon: "applications",
          },
          { id: "4", name: "Job insights", included: true, icon: "insights" },
          {
            id: "5",
            name: "Top applicant badge",
            included: true,
            icon: "badge",
          },
        ],
        buttonText: "Get started for free",
        buttonVariant: "outline",
      },
    ],
  };
};

export default function UpgradePage() {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const loadPricingData = async () => {
      try {
        setLoading(true);
        const data = await fetchPricingData();
        setPricingData(data);
      } catch (error) {
        console.error("Failed to load pricing data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPricingData();
  }, []);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Add your plan selection logic here
    console.log("Selected plan:", planId);
  };

  const getFeatureIcon = (iconName?: string) => {
    const IconComponent =
      featureIcons[iconName as keyof typeof featureIcons] ||
      featureIcons.default;
    return IconComponent;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-8 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-20 mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div
                      key={j}
                      className="h-4 bg-gray-200 rounded w-full"
                    ></div>
                  ))}
                </div>
                <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!pricingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Failed to load pricing data
          </h2>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {pricingData.title}
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg  text-gray-600 mb-2">
              {pricingData.subtitle}
            </p>
            <p className="text-lg text-gray-600">{pricingData.description}</p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingData.plans.map((plan) => {
            const isRecommended = plan.recommended;
            const isPopular = plan.popular;

            return (
              <Card
                key={plan.id}
                className={`relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isRecommended
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 shadow-xl scale-105"
                    : "bg-white border border-gray-200 shadow-lg hover:border-green-300"
                } ${selectedPlan === plan.id ? "ring-4 ring-green-200" : ""}`}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-6 py-2 text-sm font-semibold shadow-lg">
                      <Crown className="w-4 h-4 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                )}

                {/* Popular Badge */}
                {isPopular && !isRecommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-6 py-2 text-sm font-semibold shadow-lg">
                      <Star className="w-4 h-4 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <CardTitle
                    className={`text-2xl font-bold ${
                      isRecommended ? "text-gray-900" : "text-gray-800"
                    }`}
                  >
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 mt-2">
                    {plan.description}
                  </CardDescription>

                  {/* Price Display */}
                  <div className="mt-6">
                    <div className="flex items-center justify-center">
                      <span
                        className={`text-5xl md:text-6xl font-bold ${
                          isRecommended ? "text-green-600" : "text-gray-900"
                        }`}
                      >
                        {plan.currency}
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <div className="ml-4">
                          <span className="text-2xl text-gray-400 line-through">
                            {plan.currency}
                            {plan.originalPrice}
                          </span>
                          <Badge
                            variant="secondary"
                            className="ml-2 bg-red-100 text-red-600"
                          >
                            {Math.round(
                              (1 - plan.price / plan.originalPrice) * 100
                            )}
                            % OFF
                          </Badge>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mt-2 font-medium">
                      {plan.period}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {plan.features.map((feature) => {
                    const IconComponent = getFeatureIcon(feature.icon);
                    return (
                      <div
                        key={feature.id}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`rounded-full p-1 ${
                            feature.included
                              ? isRecommended
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-600"
                              : "bg-red-100 text-red-400"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            feature.included ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    );
                  })}
                </CardContent>

                <CardFooter className="pt-6">
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    variant={
                      isRecommended
                        ? "default"
                        : plan.buttonVariant || "outline"
                    }
                    className={`w-full py-6 text-lg font-semibold transition-all duration-200 ${
                      isRecommended
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                        : plan.buttonVariant === "outline"
                        ? "border-2 border-gray-300 hover:border-green-500 hover:text-green-600"
                        : ""
                    }`}
                  >
                    {selectedPlan === plan.id ? (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Selected
                      </>
                    ) : (
                      plan.buttonText
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
