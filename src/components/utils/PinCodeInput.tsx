import React, { useContext, useRef, useState } from "react";
import { themeContext } from "../../context/ThemeContext";
import { t } from "i18next";

interface PinCodeInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  disabled?: boolean;
}

/**
 * The PinCodeInput component represents a modal with six inputs to be filled
 * with the validation code sent to the user's email.
 *
 * @param {Object} props - The properties object.
 * @param {number} [props.length=6] - The number of input fields for the PIN code. Defaults to 6.
 * @param {function} [props.onComplete] - Callback function triggered when the PIN code is completely filled.
 * @param {boolean} [props.disabled=false] - Disables the input fields if set to true. Defaults to false.
 */
const PinCodeInput: React.FC<PinCodeInputProps> = ({
  length = 6,
  onComplete,
  disabled = false,
}) => {
  const { theme } = useContext(themeContext);
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    // Only accepts numbers
    if (!/^\d*$/.test(value)) return;
    // Restrict to a single character
    const digit = value.slice(-1);

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    const isNotLastDigit = index < length - 1;
    if (digit && isNotLastDigit) {
      inputRefs.current[index + 1]?.focus();
    }

    const filledCode = newCode.join("");
    if (filledCode.length === length && onComplete && !newCode.includes("")) {
      onComplete(filledCode);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const isNotFirstDigit = !code[index] && index > 0;
    if (e.key === "Backspace" && isNotFirstDigit) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }

    const isNotLastDigit = index < length - 1;
    if (e.key === "ArrowRight" && isNotLastDigit) {
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    const isDigitNumericAndNotEmpty = /^\d+$/.test(pastedData);
    const isPastedDataWithinLength = pastedData.length <= length;

    if (isDigitNumericAndNotEmpty && isPastedDataWithinLength) {
      const digits = pastedData.split("").slice(0, length);
      const newCode = [...Array(length).fill("")];

      digits.forEach((digit, index) => {
        newCode[index] = digit;
      });

      setCode(newCode);

      if (digits.length === length && onComplete) {
        onComplete(newCode.join(""));
      }

      const nextEmptyIndex = newCode.findIndex((d) => d === "");
      if (nextEmptyIndex >= 0) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[length - 1]?.focus();
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div
        className={`p-6 rounded-lg w-5/6 ${
          theme === "dark"
            ? "bg-dark border-fourth"
            : "bg-light-100 border-light-200"
        } border-2 shadow-xl`}
      >
        <h3 className="text-xl font-bold mb-4 text-center">
          {t("verify.title")}
        </h3>
        <p className=" text-center">{t("verify.message")}</p>
        <p className="mb-4 text-center text-second font-medium">
          {t("verify.duration")}
        </p>

        <div className="flex space-x-1 xs:space-x-2 justify-center my-6">
          {Array.from({ length }, (_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              autoFocus={index === 0}
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              value={code[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={disabled}
              className={`
                w-1/6 h-10 xs:w-12 xs:h-16 text-center text-xl font-bold rounded-lg border-2
                focus:outline-none focus:ring-2 transition-all
                ${
                  theme === "dark"
                    ? "bg-third text-light-100 border-fourth focus:ring-second"
                    : "bg-light-200 text-dark border-light-200 focus:ring-second"
                }
                ${disabled ? "opacity-60 cursor-not-allowed" : ""}
              `}
            />
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button
            className={`px-6 py-2 rounded-lg font-medium ${
              theme === "dark"
                ? "bg-second text-dark"
                : "bg-light-200 text-dark"
            }`}
            onClick={() => onComplete && onComplete(code.join(""))}
          >
            {t("verify.verify")}
          </button>
        </div>

        <p className="text-center mt-2">{t("verify.noCode")}</p>
        <p className="text-center text-second cursor-pointer">
          {t("verify.resend")}
        </p>
      </div>
    </div>
  );
};

export default PinCodeInput;
