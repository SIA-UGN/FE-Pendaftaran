import { useState } from "react";

/**
 * Hook untuk validasi multi-step form
 * @param {number} totalSteps - Total jumlah steps
 * @returns {Object} Validation utilities
 */
export const useStepValidation = (totalSteps = 1) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const markStepAsCompleted = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const markStepAsIncomplete = (step) => {
    setCompletedSteps((prev) => prev.filter((s) => s !== step));
  };

  const isStepCompleted = (step) => {
    return completedSteps.includes(step);
  };

  const setStepErrors = (step, stepErrors) => {
    setErrors((prev) => ({
      ...prev,
      [step]: stepErrors,
    }));
  };

  const clearStepErrors = (step) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[step];
      return newErrors;
    });
  };

  const getStepErrors = (step) => {
    return errors[step] || {};
  };

  const hasStepErrors = (step) => {
    const stepErrors = errors[step];
    return stepErrors && Object.keys(stepErrors).length > 0;
  };

  const reset = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setErrors({});
  };

  return {
    currentStep,
    completedSteps,
    errors,
    nextStep,
    prevStep,
    goToStep,
    markStepAsCompleted,
    markStepAsIncomplete,
    isStepCompleted,
    setStepErrors,
    clearStepErrors,
    getStepErrors,
    hasStepErrors,
    reset,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    progress: (completedSteps.length / totalSteps) * 100,
  };
};
