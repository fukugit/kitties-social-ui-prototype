import React, { useState } from 'react';

export default function StepBar() {
  const steps = ['入力', '確認', '支払い'];
  const [currentStep, setCurrentStep] = useState(0); // 現在のステップを0から開始

  return (
    <div className="flex justify-center items-center space-x-8 mt-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full 
              ${index <= currentStep ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-500'} 
              ${index < currentStep ? 'border-purple-500' : 'border-gray-200'} border-2`}
          >
            {index <= currentStep ? (
              <span className="font-bold">{index + 1}</span>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <span className={`mt-2 ${index <= currentStep ? 'text-purple-500' : 'text-gray-500'} font-semibold`}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-20 ${index < currentStep ? 'bg-purple-500' : 'bg-gray-200'} mt-2`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}