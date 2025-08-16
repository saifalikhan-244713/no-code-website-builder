import {
  LayoutNode,
  HeaderNode,
  NavbarNode,
  CardsContainerNode,
} from "../models/layoutModel";

export const addComponentToLayout = (
  layout: LayoutNode[],
  componentType: LayoutNode["type"]
): LayoutNode[] => {
  const id = Date.now().toString();

  switch (componentType) {
    case "header": {
      const node: HeaderNode = {
        id,
        type: "header",
        props: {
          title: "Welcome to My Website",
          subtitle: "This is a customizable header section",
        },
      };
      return [...layout, node];
    }

    case "navbar": {
      const node: NavbarNode = {
        id,
        type: "navbar",
        props: {
          brand: "My Website",
          links: ["Home", "About"],
        },
      };
      return [...layout, node];
    }

    case "cardsContainer": {
      const node: CardsContainerNode = {
        id,
        type: "cardsContainer",
        props: {
          containerTitle: "Our Features",
          cards: [
            { heading: "Card 1", description: "This is card one." },
            { heading: "Card 2", description: "This is card two." },
            { heading: "Card 3", description: "This is card three." },
          ],
        },
      };
      return [...layout, node];
    }

    default:
      return layout;
  }
};

export const updateComponentProps = (
  layout: LayoutNode[],
  id: string,
  newProps: Partial<LayoutNode["props"]>
): LayoutNode[] => {
  return layout.map((node) => {
    if (node.id !== id) return node;

    switch (node.type) {
      case "header":
        return { ...node, props: { ...node.props, ...newProps } } as HeaderNode;
      case "navbar":
        return { ...node, props: { ...node.props, ...newProps } } as NavbarNode;
      case "cardsContainer":
        return {
          ...node,
          props: { ...node.props, ...newProps },
        } as CardsContainerNode;
      default:
        return node;
    }
  });
};
