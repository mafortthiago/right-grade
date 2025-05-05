import React, { FormEvent, useContext, useState } from "react";
import { themeContext } from "../../context/ThemeContext";
import Input from "../Input";
import InputSubmit from "../InputSubmit";
import { t } from "i18next";
import { BsLockFill } from "react-icons/bs";
import { useTeacherStore } from "../../store/teacher/teachers";
import { Teacher } from "../../store/teacher/interfaces/Teacher";
import { useSnackbar } from "../../context/SnackBarContext";
import { ErrorMessages as IErrorMessages } from "../../util/errorTranslator";
import ErrorMessages from "../error/ErrorMessages";
import PinCodeInput from "../utils/PinCodeInput";

interface EditProfileProps {
  teacher: Teacher;
  setTeacher: (teacher: Teacher) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ teacher, setTeacher }) => {
  const { theme } = useContext(themeContext);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [name, setName] = useState<string>(teacher.name);
  const { updateName, updatePassword, validatePassword } = useTeacherStore();
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [isNewPassordVisible, setIsNewPassordVisible] =
    useState<boolean>(false);
  const [isConfirmNewPassordVisible, setIsConfirmNewPassordVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const [errorEditName, setErrorEditName] = useState<IErrorMessages>();
  const [errorEditPassword, setErrorEditPassword] = useState<IErrorMessages>();
  const [isPinCodeInputVisible, setPinCodeInputVisible] =
    useState<boolean>(false);

  const handlePinCodeComplete = async (code: string) => {
    try {
      await updatePassword(newPassword, teacher.email, code);
      showSnackbar({
        title: t("success"),
        body: t("authentication.updatedPassword"),
        isError: false,
      });
    } catch (error: any) {
      setErrorEditPassword(JSON.parse(error.message));
    } finally {
      setLoading(false);
    }
    setPinCodeInputVisible(false);
  };

  const passwordValidate = () => {
    if (newPassword !== confirmNewPassword) {
      setErrorEditPassword({
        invalidPassword: t("authentication.register.passwordMatchError"),
      });
      return;
    }
    if (newPassword.length < 8) {
      setErrorEditPassword({
        invalidPassword: t("authentication.register.invalidPassword"),
      });
      return;
    }
    return true;
  };

  const handleEditPassword = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!passwordValidate()) {
      setLoading(false);
      return;
    }
    setErrorEditPassword({});
    try {
      await validatePassword(password, teacher.email);
      setPinCodeInputVisible(true);
    } catch (error: any) {
      setErrorEditPassword({ invalidPassword: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEditName = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      await updateName(name);
      setTeacher({
        ...teacher,
        name,
      });
    } catch (error: any) {
      setErrorEditName(JSON.parse(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`w-3/4 flex flex-col mt-2 rounded-xl p-6 border outline
        ${
          theme === "dark"
            ? "bg-gradient-to-t from-third to-dark outline-fourth border-light-100 hover:shadow-gray-800"
            : "bg-gradient-to-t from-light-100 to-light-20 outline-light-200 hover:shadow-gray-400"
        }`}
      >
        <h2 className="font-medium">{t("profile.editName")}</h2>
        <form>
          <Input
            textLabel={t("authentication.login.name")}
            type="text"
            value={name}
            setValue={setName}
          />
          <InputSubmit
            value={t("profile.editName")}
            handleSubmit={handleEditName}
            isLoading={loading}
          />
          {errorEditName && <ErrorMessages error={errorEditName} />}
        </form>
      </div>
      <div
        className={`w-3/4 flex flex-col mt-2 rounded-xl p-6 border outline
        ${
          theme === "dark"
            ? "bg-gradient-to-t from-third to-dark outline-fourth border-light-100 hover:shadow-gray-800"
            : "bg-gradient-to-t from-light-100 to-light-20 outline-light-200 hover:shadow-gray-400"
        }`}
      >
        <h2 className="font-medium">{t("profile.editPassword")}</h2>
        <form>
          <Input
            textLabel={t("profile.currentPassword")}
            type={isCurrentPasswordVisible ? "text" : "password"}
            value={password}
            setValue={setPassword}
            icon={BsLockFill}
            isInputPassword={true}
            isVisible={isCurrentPasswordVisible}
            setIsVisible={setIsCurrentPasswordVisible}
          />
          <Input
            textLabel={t("profile.newPassword")}
            type={isNewPassordVisible ? "text" : "password"}
            value={newPassword}
            setValue={setNewPassword}
            icon={BsLockFill}
            isInputPassword={true}
            isVisible={isNewPassordVisible}
            setIsVisible={setIsNewPassordVisible}
          />
          <Input
            textLabel={t("profile.confirmNewPassword")}
            type={isConfirmNewPassordVisible ? "text" : "password"}
            value={confirmNewPassword}
            setValue={setConfirmNewPassword}
            icon={BsLockFill}
            isInputPassword={true}
            isVisible={isConfirmNewPassordVisible}
            setIsVisible={setIsConfirmNewPassordVisible}
          />
          <InputSubmit
            value={t("profile.editPassword")}
            handleSubmit={handleEditPassword}
            isLoading={loading}
          />
          {errorEditPassword && <ErrorMessages error={errorEditPassword} />}
        </form>
      </div>
      {isPinCodeInputVisible && (
        <PinCodeInput length={6} onComplete={handlePinCodeComplete} />
      )}
    </>
  );
};

export default EditProfile;
