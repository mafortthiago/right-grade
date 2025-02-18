import { ReactElement } from "react";
import { TabProps } from "./TabProps";

export interface TabsProps {
  groupId: string;
  children?: ReactElement<TabProps>[];
}
