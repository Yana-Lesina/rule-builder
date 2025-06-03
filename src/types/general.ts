export type UnionType<T> = T[keyof T];

export const LOGIC_TYPES = {
  AND: 'AND',
  OR: 'OR',
} as const;

export type LogicType = UnionType<typeof LOGIC_TYPES>;

export const OPERATOR = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not equals',
  IS_AFTER: 'is after',
  IS_BEFORE: 'is before',
} as const;

export type Operator = UnionType<typeof OPERATOR>;

export const NODE_TYPE = {
  GROUP: 'group',
  FILTER: 'filter',
} as const;

export type NodeType = UnionType<typeof NODE_TYPE>;

// ---------------------------------------
interface BaseNode {
  id: string;
  type: NodeType;
  disabled?: boolean;
  locked?: boolean;
}

export interface FilterNode extends BaseNode {
  field: string;
  operator: Operator;
  value: string;
}

export interface GroupNode extends BaseNode {
  name: string;
  logic_type: LogicType;
  collapsed?: boolean;
  children: (FilterNode | GroupNode)[];
}
