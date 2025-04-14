import { FunctionComponent, useContext, useState } from "react";
import Input from "../Input";
import { t } from "i18next";
import { useSnackbar } from "../../context/SnackBarContext";
import InputSubmit from "../InputSubmit";
import { themeContext } from "../../context/ThemeContext";
import { Group } from "../../store/classes";
import { renameClassCard } from "../../store/classes/renameClassCard";

interface RenameAssessmentProps {
  group: Group;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setIsMenuVisible: (value: boolean) => void;
}
const CardRename: FunctionComponent<RenameAssessmentProps> = ({
  group,
  loading,
  setLoading,
  setIsMenuVisible,
}) => {
  const [name, setName] = useState<string>(group.name);
  const { showSnackbar } = useSnackbar();
  const { theme } = useContext(themeContext);

  const validateName = (name: string) => {
    if (name.length < 2 || name.length > 20) {
      throw new Error(t("class.error.name"));
    }
  };

  const handleName = async () => {
    try {
      setLoading(true);
      group.name = name;
      validateName(name);
      await renameClassCard(group);
      showSnackbar({
        title: t("error"),
        body: "Sucesso ao renomear turma.",
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
      className={`flex flex-col items-start absolute px-5 py-2 rounded top-full right-0 w-40 font-normal z-10 border mt-1 ${
        theme == "dark"
          ? "bg-fourth border-gray-800"
          : "bg-light-100 border-gray-400"
      }`}
    >
      <Input value={name} setValue={setName} textLabel="" type="text" />
      <InputSubmit
        value={t("table.assessment.rename")}
        handleSubmit={handleName}
        isLoading={loading}
      />
    </div>
  );
};

export default CardRename;
