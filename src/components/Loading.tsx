import React from "react";
import "../styles/Loading.css";
import { t } from "i18next";
const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="matrix">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="cell" id={`cell${index}`}></div>
        ))}
      </div>
      <p>{t("loading")}</p>
    </div>
  );
};

export default Loading;
