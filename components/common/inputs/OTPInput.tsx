import { useRef, useState } from "react";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // If OTP is complete, call the callback
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, length);
    const newOtp = [...otp];

    for (let i = 0; i < pastedText.length; i++) {
      newOtp[i] = pastedText[i];
      if (i < length - 1) {
        inputRefs.current[i + 1]?.focus();
      }
    }

    setOtp(newOtp);

    // If OTP is complete, call the callback
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="flex gap-2">
      {otp.map((digit: any, index: any) => (
        <input
          key={index}
          type="number"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="remove-spin-button w-10 h-10 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-0"
          onFocus={(e) => e.target.select()} // Auto-select on focus
        />
      ))}
    </div>
  );
};

export default OTPInput;
