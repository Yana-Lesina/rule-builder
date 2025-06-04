import { INIT_STORE_VALUE } from 'mock-data/store';
import { NODE_TYPE, type FilterNode, type GroupNode } from 'types/general';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface Rule {
  id: string;
  name: string;
  child: FilterNode | GroupNode | null;
}

export interface Store {
  rule: Rule;

  addInstance: (parentId: string, filterConfig: FilterNode | GroupNode) => void;
  updateFilter: (targetId: string, newFilterConfig: FilterNode) => void;
}

const findNodeById = (tree: FilterNode | GroupNode, targetID: string) => {
  let node = null;
  const stack = [tree];

  while (!node || stack.length) {
    const currentNode = stack.pop();

    if (currentNode?.id === targetID) {
      node = currentNode;
    }

    if (currentNode?.children) {
      currentNode.children.forEach((child) => {
        stack.push(child);
      });
    }
  }

  return node;
};

export const useStore = create<Store>()(
  immer((set) => ({
    rule: INIT_STORE_VALUE, // MOCK_STORE_VALUE || INIT_STORE_VALUE

    addInstance: (parentId, instanceConfig) =>
      set((state) => {
        if (state.rule.id === parentId && !state.rule.child) {
          state.rule.child = instanceConfig;
        } else {
          const parentNode = findNodeById(state.rule.child, parentId);
          if (parentNode) {
            parentNode.children.push(instanceConfig);
          }
        }
      }),

    updateFilter: (targetId, { field, operator, value }) =>
      set((store) => {
        const filterNode = findNodeById(store.rule.child, targetId);

        if (filterNode && filterNode.type === NODE_TYPE.FILTER) {
          filterNode.field = field;
          filterNode.operator = operator;
          filterNode.value = value;
        }
      }),

    // deleteInstance: ...,
    // lockGroup: ...,
    // disableGroup: ...,
  }))
);
