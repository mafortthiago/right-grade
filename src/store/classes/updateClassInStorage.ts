import { Group, useClassStore } from "../classes";

export const updateClassInStorage = (group: Group) => {
  const classes = useClassStore.getState().groups;
  const updatedClasses = classes.map((c) => {
    if (c.id === group.id) {
      return group;
    }
    return c;
  });
  useClassStore.setState(() => ({
    groups: updatedClasses,
  }));
};
