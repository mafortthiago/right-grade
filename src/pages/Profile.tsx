import { FunctionComponent, useContext, useEffect, useState } from "react";
import { themeContext } from "../context/ThemeContext";
import BreadCrumb from "../components/breadCrumb/BreadCrumb";
import ProfileInformation from "../components/profile/ProfileInformation";
import EditProfile from "../components/profile/EditProfile";
import { Teacher } from "../store/teacher/interfaces/Teacher";
import { getTeacherById } from "../store/teacher/functions/getTeacherById";
import { useSnackbar } from "../context/SnackBarContext";
import { t } from "i18next";
import Loading from "../components/Loading";

const Profile: FunctionComponent = () => {
  const [teacher, setTeacher] = useState<Teacher>();
  const { theme } = useContext(themeContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const loadTeacher = async () => {
    try {
      setLoading(true);
      const teacher = await getTeacherById();
      setTeacher(teacher);
    } catch (error: any) {
      showSnackbar({
        title: t("error"),
        body: t("profile.loadError"),
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeacher();
  }, []);

  return (
    <main
      className={
        "w-full min-h-screen flex flex-col items-center mt-2 rounded pt-20 mb-8 " +
        (theme === "dark"
          ? "bg-gradient-to-t from-third to-dark"
          : "bg-gradient-to-t from-light-100 to-light-200")
      }
    >
      <BreadCrumb />
      {loading ? (
        <Loading size="large" />
      ) : (
        <>
          {teacher && <ProfileInformation teacher={teacher} />}
          {teacher && <EditProfile teacher={teacher} setTeacher={setTeacher} />}
        </>
      )}
    </main>
  );
};

export default Profile;
