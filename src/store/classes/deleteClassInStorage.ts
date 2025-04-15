import { Group, useClassStore } from "../classes";

export const deleteClassInStorage = (group: Group) => {
  const classes = useClassStore.getState().groups;
  const updatedClasses = classes.filter((g) => g.id != group.id);
  useClassStore.setState(() => ({
    groups: updatedClasses,
  }));
};
