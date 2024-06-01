"use client"

import React, { ChangeEvent } from 'react';

interface CheckboxWithTextProps {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
}

export function CheckboxWithText({ isChecked, setIsChecked }: CheckboxWithTextProps) {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="items-top flex space-x-2">
      <input
        type="checkbox"
        id="terms1"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="peer"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our <a href="/sy-terms-and-conditions.pdf" target="_blank" className="text-black-500 underline">Terms of Service</a> and <a href="/sy-privacy-policy.pdf" target="_blank" className="text-black-500 underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
