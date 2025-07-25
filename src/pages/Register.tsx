import { useContext, useState } from "react";
import { themeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  BsCardText,
  BsCheckSquareFill,
  BsEnvelopeAtFill,
  BsLockFill,
  BsSquare,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import InputSubmit from "../components/InputSubmit";
import { useAuthStore } from "../store/authentication/auth";
import ErrorMessages from "../components/error/ErrorMessages";
import { ErrorMessages as IErrorMessages } from "../util/errorTranslator";

const Register: React.FC = () => {
  const { theme } = useContext(themeContext);
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IErrorMessages>({});
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const { register } = useAuthStore();

  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAcceptPolicy(false);
    setError({}); 
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError({ error: t("authentication.register.passwordMatchError") });
      return;
    }
    const user = {
      email,
      name,
      password,
      acceptPolicy,
    };
    try {
      setLoading(true);
      await register(user);
      clearFields();
    } catch (error: any) {
      setError(JSON.parse(error.message));
    } finally {
      setLoading(false);
    }
  };
  return (
    <main
      className={
        "w-full min-h-screen flex flex-col items-center mt-2 rounded " +
        (theme === "dark"
          ? "bg-gradient-to-t from-third to-dark"
          : "bg-gradient-to-t from-light-100 to-light-200")
      }
    >
      <section
        className={
          "w-full lg:w-3/4 flex-col flex items-center p-4 md:p-8 mt-10 rounded "
        }
      >
        <h2
          className={
            "font-semibold text-lg " +
            (theme === "dark" ? "text-first" : "text-dark")
          }
        >
          {t("authentication.register.title")}
        </h2>
        <p className={"font-normal"}>
          {t("authentication.register.description")}
        </p>
        <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-items-center mt-6 rounded shadow-lg shadow-gray">
          <form
            className={
              "w-full md:w-1/2 flex-col flex h-full rounded justify-center p-5 " +
              (theme === "dark" ? "bg-third" : "bg-light-100")
            }
          >
            <div className={"p-4 mt-4"}>
              <Input
                textLabel={t("authentication.login.name")}
                type={"text"}
                icon={BsCardText}
                value={name}
                setValue={setName}
              />
              <Input
                textLabel={t("authentication.login.email")}
                type={"text"}
                icon={BsEnvelopeAtFill}
                value={email}
                setValue={setEmail}
              />

              <Input
                textLabel={t("authentication.login.password")}
                type={isPasswordVisible ? "text" : "password"}
                icon={BsLockFill}
                value={password}
                setValue={setPassword}
                isInputPassword={true}
                isVisible={isPasswordVisible}
                setIsVisible={setIsPasswordVisible}
              />
              <Input
                textLabel={t("authentication.register.confirmPassword")}
                type={isConfirmPasswordVisible ? "text" : "password"}
                icon={BsLockFill}
                value={confirmPassword}
                setValue={setConfirmPassword}
                isInputPassword={true}
                isVisible={isConfirmPasswordVisible}
                setIsVisible={setIsConfirmPasswordVisible}
              />
              <label className="flex items-center mt-2 mb-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={acceptPolicy}
                  onChange={() => setAcceptPolicy((prev) => !prev)}
                  required
                />
                {acceptPolicy ? (
                  <BsCheckSquareFill
                    className={`${
                      theme === "dark" ? "text-first" : "text-second"
                    } w-6 h-6`}
                  />
                ) : (
                  <BsSquare className="text-gray-400 w-6 h-6" />
                )}
                <span className="ml-2 text-sm flex flex-col">
                  {t("authentication.register.acceptPolicy")}{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-second underline"
                  >
                    {t("authentication.register.privacyPolicy")}
                  </a>
                </span>
              </label>
              <ErrorMessages error={error} />
            </div>
            <InputSubmit
              value={t("header.navbar.register")}
              handleSubmit={handleSubmit}
              isLoading={loading}
              isDisabled={!acceptPolicy}
            />
            <p className="text-center mb-2">
              {t("authentication.register.haveAccount")}
              <Link to={"/login"} className="text-second hover:brightness-110">
                {t("header.navbar.login")}
              </Link>
            </p>
          </form>
          <img
            src="/backgroundRegister.png"
            alt={t("imageDescription")}
            className="object-cover w-full h-40 sm:w-1/2 rounded sm:min-h-[490px]"
          />
        </div>
      </section>
    </main>
  );
};

export default Register;
