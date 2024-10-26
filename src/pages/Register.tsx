import { useContext, useState } from "react";
import { themeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { BsCardText, BsEnvelopeAtFill, BsLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import InputSubmit from "../components/InputSubmit";

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // implentar registro
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
        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-items-center mt-6 rounded shadow-lg shadow-gray">
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
            </div>
            <InputSubmit
              value={t("header.navbar.register")}
              handleSubmit={handleSubmit}
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
            className="object-cover w-full h-40 md:w-1/2 rounded md:h-full"
          />
        </div>
      </section>
    </main>
  );
};

export default Register;
