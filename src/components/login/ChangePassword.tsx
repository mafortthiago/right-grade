import React, { useContext, useState } from "react";
import Input from "../Input";
import { themeContext } from "../../context/ThemeContext";
import { t } from "i18next";
import { BsLockFill, BsXSquareFill } from "react-icons/bs";
import InputSubmit from "../InputSubmit";
import { useTeacherStore } from "../../store/teacher/teachers";
import { resetPassword } from "../../store/teacher/functions/resetPassword";

import { ErrorMessages as IErrorMessages } from "../../util/errorTranslator";
import ErrorMessages from "../error/ErrorMessages";
interface ChangePasswordProps {
  email: string;
  setIsFormChangePassword: (value: boolean) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  email,
  setIsFormChangePassword,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<IErrorMessages>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setIsConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const { updatePasswordCode } = useTeacherStore();
  const { theme } = useContext(themeContext);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError({ error: t("authentication.register.passwordMatchError") });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    validatePassword();
    try {
      setLoading(true);
      await resetPassword(email, password, updatePasswordCode);
      setIsFormChangePassword(false);
    } catch (error: any) {
      setError(JSON.parse(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
    >
      <div
        className={`p-6 rounded-lg w-5/6 md:w-1/2 lg:w-1/3 2xl:w-1/4 ${
          theme === "dark"
            ? "bg-dark border-fourth"
            : "bg-light-100 border-light-200"
        } border-2 shadow-xl`}
      >
        <div className="flex justify-between">
          <h2>{t("changePassword.title")}</h2>
          <BsXSquareFill
            className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-600"
            onClick={() => setIsFormChangePassword(false)}
          />
        </div>
        <form>
          <Input
            textLabel={t("authentication.login.password")}
            type={"password"}
            value={password}
            setValue={setPassword}
            icon={BsLockFill}
            isInputPassword={true}
            isVisible={isPasswordVisible}
            setIsVisible={setIsPasswordVisible}
          />
          <Input
            textLabel={t("authentication.register.confirmPassword")}
            type={"password"}
            value={confirmPassword}
            setValue={setIsConfirmPassword}
            icon={BsLockFill}
            isInputPassword={true}
            isVisible={isConfirmPasswordVisible}
            setIsVisible={setIsConfirmPasswordVisible}
          />
          <InputSubmit
            value={t("changePassword.title")}
            handleSubmit={handleChangePassword}
            isLoading={loading}
          />
          <ErrorMessages error={error} />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
