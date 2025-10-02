"use client";

import { useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CategoryStep } from "./steps/CategoryStep";
import { BrandStep } from "./steps/BrandStep";
import { IdentityStep } from "./steps/IdentityStep";
import { DetailsStep } from "./steps/DetailsStep";
import { WizardHeader } from "./WizardHeader";
import { useProductForm } from "./useProductForm";
import { HealthStatus } from "./steps/HealthStatus";

export type Step = "category" | "brand" | "identity" | "details";

const ProductCreationWizard = () => {
  const { language } = useLanguage();
  const {
    product,
    errors,
    currentStep,
    updateProduct,
    validateStep,
    goToStep,
  } = useProductForm();

  const steps = [
    { key: "category" as const, number: 1 },
    { key: "brand" as const, number: 2 },
    { key: "identity" as const, number: 3 },
    { key: "details" as const, number: 4 },
  ];

  // Add this handler for the create product button
  const handleSubmit = useCallback(() => {
    console.log("Create product button clicked");
    validateStep(); // This will trigger the submission logic
  }, [validateStep]);

  const renderStep = () => {
    const commonProps = {
      product,
      errors,
      onUpdate: updateProduct,
      onValidate: validateStep,
      onBack: () => {
        const currentIndex = steps.findIndex((s) => s.key === currentStep);
        if (currentIndex > 0) {
          goToStep(steps[currentIndex - 1].key);
        }
      },
    };

    switch (currentStep) {
      case "category":
        return <CategoryStep {...commonProps} />;
      case "brand":
        return <BrandStep {...commonProps} />;
      case "identity":
        return <IdentityStep {...commonProps} />;
      case "details":
        return (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-9">
            <div className="col-span-1 lg:col-span-6">
              <DetailsStep {...commonProps} />
            </div>
            <div className="col-span-1 h-fit lg:col-span-3">
              <HealthStatus product={product} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={language === "ar" ? "text-right" : "text-left"}>
      <WizardHeader
        steps={steps}
        currentStep={currentStep}
        product={product}
        onStepClick={(step) => goToStep(step)}
        onSubmit={handleSubmit}
        errors={errors}
      />

      {renderStep()}
    </div>
  );
};

export default ProductCreationWizard;
