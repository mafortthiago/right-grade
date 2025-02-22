import React from "react";
import "../styles/Loading.css";
import { t } from "i18next";

interface LoadingProps {
  size: "small" | "large";
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className={`matrix_${size}`}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className={`cell_${size}`} id={`cell${index}`}></div>
        ))}
      </div>
      <p className={`${size === "small" && "text-xs"}`}>{t("loading")}</p>
    </div>
  );
};

export default Loading;
