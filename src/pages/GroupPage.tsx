import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb/BreadCrumb";
import { themeContext } from "../context/ThemeContext";
import { Group, useClassStore } from "../store/classes";
import Tabs from "../components/tab/Tabs";
import Tab from "../components/tab/Tab";
import { GradingPeriod } from "../store/gradingPeriod/interfaces/GradingPeriod";
import Table from "../components/table/Table";
import Saved from "../components/utils/Saved";

/**
 * GroupPage Component
 *
 * This component represents the page for a specific group. It displays a breadcrumb,
 * a saved notification, and a tabbed interface for grading periods within the group.
 * Each tab contains a table for the respective grading period.
 *
 * @component
 * @returns {JSX.Element} The rendered GroupPage component.
 *
 * @example
 * // Usage
 * <GroupPage />
 *
 */
const GroupPage: FunctionComponent = () => {
  const [tabs, setTabs] = useState<GradingPeriod[]>([]);
  const { id } = useParams();
  const { theme } = useContext(themeContext);
  const { groups } = useClassStore();
  const [group, setGroup] = useState<Group>();
  const loadGroup = () => {
    const group = groups.filter((g) => g.id == id)[0];
    setGroup(group);
    setTabs(group.gradingPeriods);
  };

  useEffect(() => {
    if (groups.length > 0) {
      loadGroup();
    }
  }, [groups]);

  return (
    <main
      className={
        "w-full h-screen flex flex-col items-center mt-2 rounded " +
        (theme === "dark"
          ? "bg-gradient-to-t from-third to-dark"
          : "bg-gradient-to-t from-light-100 to-light-200")
      }
    >
      <BreadCrumb />
      <Saved />
      {group && (
        <Tabs groupId={group.id}>
          {tabs &&
            tabs.map((tab, key) => (
              <Tab label={tab.name} gradingPeriod={tab} key={key}>
                <Table gradingPeriodId={tab.id || ""} groupId={group.id} />
              </Tab>
            ))}
        </Tabs>
      )}
    </main>
  );
};

export default GroupPage;
