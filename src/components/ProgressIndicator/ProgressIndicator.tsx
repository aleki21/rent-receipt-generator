import type { ReceiptStep } from "../../types/workflow";

interface ProgressIndicatorProps {
  currentStep: ReceiptStep;
}

const steps: {
  id: ReceiptStep;
  label: string;
}[] = [
  {
    id: "input",
    label: "Payment",
  },
  {
    id: "payment-confirmation",
    label: "Confirm",
  },
  {
    id: "rental-period",
    label: "Rental Period",
  },
  {
    id: "preview",
    label: "Receipt",
  },
];

function ProgressIndicator({
  currentStep,
}: ProgressIndicatorProps) {
  const currentIndex = steps.findIndex(
    (step) => step.id === currentStep
  );

  return (
    <div className="mb-8 w-full">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step.id}
              className="flex flex-1 flex-col items-center"
            >
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={`h-1 flex-1 ${
                      isCompleted
                        ? "bg-black"
                        : "bg-gray-200"
                    }`}
                  />
                )}

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    isCurrent
                      ? "bg-black text-white"
                      : isCompleted
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 ${
                      index < currentIndex
                        ? "bg-black"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              <p
                className={`mt-2 text-center text-xs ${
                  isCurrent
                    ? "font-semibold text-gray-900"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressIndicator;