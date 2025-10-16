// layout
import { Container } from "./components/layout/container";
import { ContainerMeta } from "./components/layout/container.meta";
import { Section } from "./components/layout/section";
import { SectionMeta } from "./components/layout/section.meta";
import { Stack } from "./components/layout/stack";
import { StackMeta } from "./components/layout/stack.meta";
import { Grid } from "./components/layout/grid";
import { GridMeta } from "./components/layout/grid.meta";

// display
import { Typography } from "./components/display/typography";
import { TypographyMeta } from "./components/display/typography.meta";
import { Pagination } from "./components/display/pagination";
import { PaginationMeta } from "./components/display/pagination.meta";
import { Table } from "./components/display/table";
import { TableMeta } from "./components/display/table.meta";

// ui
import { Button } from "./components/ui/button";
import { ButtonMeta } from "./components/ui/button.meta";
import { Divider } from "./components/ui/divider";
import { DividerMeta } from "./components/ui/divider.meta";

// inputs
import { Input } from "./components/inputs/input";
import { InputMeta } from "./components/inputs/input.meta";
import { Checkbox } from "./components/inputs/checkbox";
import { CheckboxMeta } from "./components/inputs/checkbox.meta";
import { Radio } from "./components/inputs/radio";
import { RadioMeta } from "./components/inputs/radio.meta";
import { Textarea } from "./components/inputs/textarea";
import { TextareaMeta } from "./components/inputs/textarea.meta";
import { Select } from "./components/inputs/select";
import { SelectMeta } from "./components/inputs/select.meta";

export type Component =
  | React.ComponentType<any>
  | React.ForwardRefExoticComponent<any>
  | React.ExoticComponent<any>;

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

export const DisplayComponentRegistry = {
  Typography: {
    component: Typography,
    meta: TypographyMeta,
  },
  Pagination: {
    component: Pagination,
    meta: PaginationMeta,
  },
  Table: {
    component: Table,
    meta: TableMeta,
  },
};

export const UiComponentRegistry = {
  Button: {
    component: Button,
    meta: ButtonMeta,
  },
  Divider: {
    component: Divider,
    meta: DividerMeta,
  },
};

export const LayoutComponentRegistry = {
  Container: {
    component: Container,
    meta: ContainerMeta,
  },
  Section: {
    component: Section,
    meta: SectionMeta,
  },
  Stack: {
    component: Stack,
    meta: StackMeta,
  },
  Grid: {
    component: Grid,
    meta: GridMeta,
  },
};

export const FormComponentRegistry = {
  Input: {
    component: Input,
    meta: InputMeta,
  },
  Select: {
    component: Select,
    meta: SelectMeta,
  },
  Checkbox: {
    component: Checkbox,
    meta: CheckboxMeta,
  },
  Radio: {
    component: Radio,
    meta: RadioMeta,
  },
  Textarea: {
    component: Textarea,
    meta: TextareaMeta,
  },
};

export const ComponentRegistry = {
  ...LayoutComponentRegistry,
  ...DisplayComponentRegistry,
  ...UiComponentRegistry,
  ...FormComponentRegistry,
} as const;

export type ComponentName = keyof typeof ComponentRegistry;
export type ComponentMeta = (typeof ComponentRegistry)[ComponentName]["meta"];

export const ComponentsByCategory = {
  Layout: [...Object.keys(LayoutComponentRegistry)] as const,
  Display: [...Object.keys(DisplayComponentRegistry)] as const,
  UI: [...Object.keys(UiComponentRegistry)] as const,
  Forms: [...Object.keys(FormComponentRegistry)] as const,
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
