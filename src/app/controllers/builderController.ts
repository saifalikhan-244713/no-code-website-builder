import { LayoutNode } from "../models/layoutModel";

export const addComponentToLayout = (
  layout: LayoutNode[],
  componentType: LayoutNode["type"]
): LayoutNode[] => {
  return [
    ...layout,
    {
      id: Date.now().toString(),
      type: componentType,
      props: {},
    },
  ];
};
