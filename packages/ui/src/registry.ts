// layout
import { Stack } from "./components/layout/stack";
import { StackMeta } from "./components/layout/stack.meta";
import { Container } from "./components/layout/container";
import { ContainerMeta } from "./components/layout/container.meta";

// display
import { Typography } from "./components/display/typography";
import { TypographyMeta } from "./components/display/typography.meta";

// inputs
import { Button } from "./components/inputs/button";
import { ButtonMeta } from "./components/inputs/button.meta";
import { Input } from "./components/inputs/input";
import { InputMeta } from "./components/inputs/input.meta";
import { Checkbox } from "./components/inputs/checkbox";
import { CheckboxMeta } from "./components/inputs/checkbox.meta";
import { Radio } from "./components/inputs/radio";
import { RadioMeta } from "./components/inputs/radio.meta";
import { Textarea } from "./components/inputs/textarea";
import { TextareaMeta } from "./components/inputs/textarea.meta";

export interface ComponentRegistryItem {
  component:
    | React.ComponentType<any>
    | React.ForwardRefExoticComponent<any>
    | React.ExoticComponent<any>;
  meta: {
    component: string;
    category?: string;
    description?: string;
    props: Record<string, any>;
  };
}

export const ComponentRegistry = {
  Typography: {
    component: Typography,
    meta: TypographyMeta,
  },
  Stack: {
    component: Stack,
    meta: StackMeta,
  },
  Container: {
    component: Container,
    meta: ContainerMeta,
  },
  Button: {
    component: Button,
    meta: ButtonMeta,
  },
  Radio: {
    component: Radio,
    meta: RadioMeta,
  },
  Textarea: {
    component: Textarea,
    meta: TextareaMeta,
  },
  Input: {
    component: Input,
    meta: InputMeta,
  },
  Checkbox: {
    component: Checkbox,
    meta: CheckboxMeta,
  },
} as const;

export type ComponentName = keyof typeof ComponentRegistry;
export type ComponentMeta = (typeof ComponentRegistry)[ComponentName]["meta"];

export const ComponentsByCategory = {
  Layout: ["Stack", "Container"] as const,
  Display: ["Typography"] as const,
  UI: ["Button"] as const,
  Forms: ["Input", "Radio", "Checkbox", "Textarea"] as const,
} as const;

export function getComponent(name: ComponentName) {
  return ComponentRegistry[name]?.component;
}

export function getComponentMeta(name: ComponentName) {
  return ComponentRegistry[name]?.meta;
}

export function getAllComponents() {
  return Object.entries(ComponentRegistry).map(([name, item]) => ({
    name,
    component: item.component,
    meta: item.meta,
  }));
}
