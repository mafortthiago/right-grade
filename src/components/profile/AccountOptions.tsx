// imports
import { FunctionComponent, useContext, useState } from "react";
import { themeContext } from "../../context/ThemeContext";
import {
  BsBoxArrowRight,
  BsExclamationDiamondFill,
  BsTrashFill,
} from "react-icons/bs";
import { t } from "i18next";
import { useAuthStore } from "../../store/authentication/auth";
import Confirm from "../utils/Confirm";
import { useSnackbar } from "../../context/SnackBarContext";

/**
 * Component that returns the account options logout and delete account.
 *
 * @example
 * return (
 *   <AccountOptions />
 * )
 */
const AccountOptions: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const { logout, deleteAccount } = useAuthStore();
  const [isAccountDeleteModalVisible, setIsAccountDeleteModalVisible] =
    useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      showSnackbar({
        title: t("success"),
        body: t("profile.successDelete"),
        isError: false,
      });
      await logout();
    } catch (error: any) {
      showSnackbar({
        title: t("error"),
        body: t("profile.errorDelete"),
        isError: true,
      });
    }
  };

  // styles
  const divClasses = `w-3/4 flex flex-col mt-2 rounded-xl p-6 border outline
        ${
          theme === "dark"
            ? "bg-gradient-to-t from-third to-dark outline-fourth border-light-100 hover:shadow-gray-800"
            : "bg-gradient-to-t from-light-100 to-light-20 outline-light-200 hover:shadow-gray-400"
        }`;
  const buttonClasses = `hover:border border-red-500 mt-2 gap-1.5 flex items-center justify-center p-1 rounded ${
    theme == "dark" ? "bg-third" : "bg-light-200"
  }`;

  return (
    <div className={divClasses}>
      <h3 className="font-semibold flex gap-1.5 items-center">
        <BsExclamationDiamondFill />
        <span>{t("profile.attentionZone")}</span>
      </h3>
      <button
        className={buttonClasses}
        onClick={() => setIsAccountDeleteModalVisible(true)}
      >
        <span>{t("profile.deleteAccount")}</span>
        <BsTrashFill className="text-red-500" />
      </button>
      <button className={buttonClasses} onClick={handleLogout}>
        <span>{t("profile.logout")}</span>
        <BsBoxArrowRight className="text-red-500" />
      </button>
      {isAccountDeleteModalVisible && (
        <Confirm
          title={t("profile.deleteAccount")}
          message={t("profile.messageDelete")}
          confirmText={t("profile.confirmMessageDelete")}
          onConfirm={handleDeleteAccount}
          onCancel={() => setIsAccountDeleteModalVisible(false)}
        />
      )}
    </div>
  );
};

export default AccountOptions;
