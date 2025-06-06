import { FunctionComponent, useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const PrivacyPolicy: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const { t } = useTranslation();

  const divClasses = `w-full flex flex-col mt-2 rounded-xl p-6 border outline
        ${
          theme === "dark"
            ? "bg-gradient-to-t from-third to-dark outline-fourth border-light-100 hover:shadow-gray-800"
            : "bg-gradient-to-t from-light-100 to-light-20 outline-light-200 hover:shadow-gray-400"
        }`;
  return (
    <main
      className={
        "w-full min-h-screen flex flex-col items-start mt-2 rounded pt-2 sm:pt-12 mb-8 px-4 sm:px-20 " +
        (theme === "dark"
          ? "bg-gradient-to-t from-third to-dark"
          : "bg-gradient-to-t from-light-100 to-light-200")
      }
    >
      <div className={divClasses}>
        <h2 className="font-bold text-xl">{t("privacy.title")}</h2>
        <p>
          <strong>{t("privacy.lastUpdate")}</strong>
        </p>

        <p className="py-1">{t("privacy.intro")}</p>

        <h3 className="font-semibold">{t("privacy.section1Title")}</h3>
        <p className="ml-4">{t("privacy.section1Text1")}</p>
        <ul className="list-disc ml-12">
          <li>{t("privacy.section1List1.name")}</li>
          <li>{t("privacy.section1List1.email")}</li>
          <li>{t("privacy.section1List1.password")}</li>
          <li>{t("privacy.section1List1.others")}</li>
        </ul>
        <p className="ml-4">{t("privacy.section1Text2")}</p>

        <h3 className="font-semibold">{t("privacy.section2Title")}</h3>
        <p className="ml-4">{t("privacy.section2Text1")}</p>
        <ul className="list-disc ml-12">
          <li>{t("privacy.section2List1.auth")}</li>
          <li>{t("privacy.section2List1.personalization")}</li>
          <li>{t("privacy.section2List1.storage")}</li>
        </ul>
        <p className="ml-4">{t("privacy.section2Text2")}</p>

        <h3 className="font-semibold">{t("privacy.section3Title")}</h3>
        <p className="ml-4">{t("privacy.section3Text1")}</p>

        <h3 className="font-semibold">{t("privacy.section4Title")}</h3>
        <p className="ml-4">{t("privacy.section4Text1")}</p>

        <h3 className="font-semibold">{t("privacy.section5Title")}</h3>
        <p className="ml-4">{t("privacy.section5Text1")}</p>
        <ul className="list-disc ml-12">
          <li>{t("privacy.section5List1.access")}</li>
          <li>{t("privacy.section5List1.edit")}</li>
          <li>{t("privacy.section5List1.delete")}</li>
        </ul>
        <p className="ml-4">{t("privacy.section5Text2")}</p>

        <h3 className="font-semibold">{t("privacy.section6Title")}</h3>
        <p className="ml-4">{t("privacy.section6Text1")}</p>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
