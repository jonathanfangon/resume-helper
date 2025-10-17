interface Step {
  number: number;
  label: string;
  status: 'pending' | 'active' | 'completed';
}

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
}) => {
  const steps: Step[] = [
    {
      number: 1,
      label: 'Upload Resume',
      status:
        currentStep > 1
          ? 'completed'
          : currentStep === 1
          ? 'active'
          : 'pending',
    },
    {
      number: 2,
      label: 'Job Details',
      status:
        currentStep > 2
          ? 'completed'
          : currentStep === 2
          ? 'active'
          : 'pending',
    },
    {
      number: 3,
      label: 'Results',
      status:
        currentStep > 3
          ? 'completed'
          : currentStep === 3
          ? 'active'
          : 'pending',
    },
  ];

  return (
    <div className='step-indicator'>
      {steps.map((step, index) => (
        <>
          <div key={step.number} className={`step ${step.status}`}>
            <div className='step-circle' data-step={step.number} />
            <span className='step-label'>{step.label}</span>
          </div>
          {index < steps.length - 1 && <div className='step-connector' />}
        </>
      ))}
    </div>
  );
};
