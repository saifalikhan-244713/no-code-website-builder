// layoutModel.ts
export interface BaseNode {
  id: string;
  type: string;
  order: number;
}

export interface HeaderNode extends BaseNode {
  type: "header";
  props: {
    title: string;
    subtitle: string;
  };
}

export interface NavbarNode extends BaseNode {
  type: "navbar";
  props: {
    brand: string;
    links: string[];
  };
}

export interface CardsContainerNode extends BaseNode {
  type: "cardsContainer";
  props: {
    containerTitle: string;
    cards: { heading: string; description: string }[];
  };
}

// Union type
export type LayoutNode = HeaderNode | NavbarNode | CardsContainerNode;
