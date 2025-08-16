export interface LayoutNode {
  id: string;
  type: "navbar" | "header";
  props?: Record<string, unknown>;
}
