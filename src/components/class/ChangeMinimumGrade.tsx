import React, { useContext, useState } from "react";
import { useSnackbar } from "../../context/SnackBarContext";
import { themeContext } from "../../context/ThemeContext";
import { Group } from "../../store/classes";
import InputNumber from "../InputNumber";
import InputSubmit from "../InputSubmit";
import { t } from "i18next";
import { updateMinimumGrade } from "../../store/classes/updateMinimumGrade";

interface ChangeMinimumGrade {
  group: Group;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setIsMenuVisible: (value: boolean) => void;
}

const ChangeMinimumGrade: React.FC<ChangeMinimumGrade> = ({
  group,
  loading,
  setLoading,
  setIsMenuVisible,
}) => {
  const [minGrade, setMinGrade] = useState<number>(group.minimumGrade);
  const { showSnackbar } = useSnackbar();
  const { theme } = useContext(themeContext);

  const handleMinimumGrade = async () => {
    try {
      setLoading(true);
      group.minimumGrade = minGrade;
      await updateMinimumGrade(group);
      showSnackbar({
        title: t("success"),
        body: t("class.updateMinimumGradeSuccess"),
        isError: false,
      });
    } catch (error: any) {
      showSnackbar({
        title: t("error"),
        body: error.message,
        isError: true,
      });
    } finally {
      setLoading(false);
      setIsMenuVisible(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center absolute px-5 py-2 rounded top-full right-0 w-40 font-normal z-10 border mt-1 ${
        theme == "dark"
          ? "bg-fourth border-gray-800"
          : "bg-light-100 border-gray-400"
      }`}
    >
      <InputNumber
        minGrade={minGrade}
        setMinGrade={setMinGrade}
        isGradeFrom0To100={group.isGradeFrom0To100}
      />
      <InputSubmit
        value={t("class.update")}
        handleSubmit={handleMinimumGrade}
        isLoading={loading}
      />
    </div>
  );
};

export default ChangeMinimumGrade;
