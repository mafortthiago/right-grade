import { useContext, useState } from "react";
import { themeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BsLockFill, BsEnvelopeAtFill } from "react-icons/bs";
import Input from "../components/Input";
import InputSubmit from "../components/InputSubmit";
import { useAuthStore } from "../store/authentication/auth";
import { UserLogin } from "../store/authentication/interfaces/UserLogin";
import ErrorMessages from "../components/error/ErrorMessages";
import { ErrorMessages as IErrorMessages } from "../util/errorTranslator";
import PinCodeInput from "../components/utils/PinCodeInput";
import ChangePassword from "../components/login/ChangePassword";
import { sendCode } from "../store/teacher/functions/sendCode";
import { validateCode } from "../store/teacher/functions/validateCode";

const Login = () => {
  const { theme } = useContext(themeContext);
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<IErrorMessages>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { login } = useAuthStore();
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [isFormChangePassword, setIsFormChangePassword] =
    useState<boolean>(false);

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setError({});
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError({});
    const user: UserLogin = {
      email,
      password,
    };
    try {
      await login(user);
      clearFields();
    } catch (error: any) {
      setError(JSON.parse(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePinCode = async () => {
    try {
      await sendCode(email);
      setIsChangePassword(true);
    } catch (error: any) {
      setError(JSON.parse(error.message));
      setIsChangePassword(false);
    } finally {
      setLoading(false);
    }
  };

  const validatePinCode = async (code: string) => {
    try {
      setLoading(true);
      await validateCode(email, code);
      setIsChangePassword(false);
      setIsFormChangePassword(true);
    } catch (error: any) {
      setError(JSON.parse(error.message));
      setIsChangePassword(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={
        "w-full h-screen flex flex-col items-center mt-2 rounded " +
        (theme === "dark"
          ? "bg-gradient-to-t from-third to-dark"
          : "bg-gradient-to-t from-light-100 to-light-200")
      }
    >
      <section
        className={
          "w-full lg:w-3/4 flex-col flex items-center p-4 sm:p-8 mt-10 rounded "
        }
      >
        <h2
          className={
            "font-semibold text-lg " +
            (theme === "dark" ? "text-first" : "text-dark")
          }
        >
          {t("authentication.login.title")}
        </h2>
        <p className={"font-normal"}>{t("authentication.login.description")}</p>
        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-items-center mt-6 rounded shadow-lg shadow-gray">
          <form
            className={
              "w-full sm:w-1/2 flex-col flex h-full rounded justify-center p-5 lg:px-10 lg:pt-16 " +
              (theme === "dark" ? "bg-third" : "bg-light-100")
            }
          >
            <div className={"px-4 mt-4"}>
              <Input
                textLabel={t("authentication.login.email")}
                type={"text"}
                value={email}
                setValue={setEmail}
                icon={BsEnvelopeAtFill}
              />
              <Input
                textLabel={t("authentication.login.password")}
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                setValue={setPassword}
                icon={BsLockFill}
                isInputPassword={true}
                isVisible={isPasswordVisible}
                setIsVisible={setIsPasswordVisible}
              />
              <ErrorMessages error={error} />
            </div>
            <div className="px-3">
              <InputSubmit
                value={loading ? t("loading") : t("header.navbar.login")}
                handleSubmit={handleSubmit}
                isLoading={loading}
              />
            </div>

            <p
              className={`${
                theme == "dark" ? "text-first" : "text-second"
              } font-semibold text-center cursor-pointer hover:opacity-80`}
              onClick={handlePinCode}
            >
              {t("authentication.forgotPassword")}
            </p>
            <p className="text-center mb-1 mt-auto">
              {t("authentication.login.dontHaveAccount")}
              <Link
                to={"/register"}
                className={`${
                  theme == "dark" ? "text-first" : "text-second"
                } hover:brightness-110 font-semibold`}
              >
                {t("header.navbar.register")}
              </Link>
            </p>
          </form>
          <img
            src="/backgroundLogin.png"
            alt={t("imageDescription")}
            className="object-cover w-full h-40 sm:w-1/2 rounded sm:h-96"
          />
        </div>
        {isChangePassword && <PinCodeInput onComplete={validatePinCode} />}
        {isFormChangePassword && (
          <ChangePassword
            setIsFormChangePassword={setIsFormChangePassword}
            email={email}
          />
        )}
      </section>
    </main>
  );
};
export default Login;
