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

const Login = () => {
  const { theme } = useContext(themeContext);
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<IErrorMessages>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const user: UserLogin = {
      email,
      password,
    };
    try {
      await login(user);
    } catch (error: any) {
      setError(JSON.parse(error.message));
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
              "w-full sm:w-1/2 flex-col flex h-full rounded justify-center p-5 " +
              (theme === "dark" ? "bg-third" : "bg-light-100")
            }
          >
            <div className={"p-4 mt-4"}>
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
            <InputSubmit
              value={loading ? t("loading") : t("header.navbar.login")}
              handleSubmit={handleSubmit}
              isLoading={loading}
            />
            <p className="text-center">
              {t("authentication.login.dontHaveAccount")}
              <Link
                to={"/register"}
                className="text-second hover:brightness-110"
              >
                {t("header.navbar.register")}
              </Link>
            </p>
          </form>
          <img
            src="/backgroundLogin.png"
            alt={t("imageDescription")}
            className="object-cover w-full h-40 sm:w-1/2 rounded sm:h-full"
          />
        </div>
      </section>
    </main>
  );
};
export default Login;
