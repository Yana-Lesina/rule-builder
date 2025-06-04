import type { Rule } from 'store/useStore';
import { LOGIC_TYPES, NODE_TYPE, OPERATOR } from 'types/general';

export const INIT_STORE_VALUE: Rule = {
  id: 'root',
  // type: NODE_TYPE.GROUP,
  // parent: null,
  name: 'Some Custom Rule Config',
  child: null,
};

export const MOCK_STORE_VALUE: Rule = {
  ...INIT_STORE_VALUE,

  child: {
    id: 'root_group',
    type: NODE_TYPE.GROUP,
    name: 'Main group',
    logic_type: LOGIC_TYPES.AND,
    collapsed: false,
    children: [
      {
        id: 'f1',
        type: NODE_TYPE.FILTER,
        field: 'gender',
        operator: OPERATOR.EQUALS,
        value: 'male',
      },
      {
        id: 'g2',
        type: NODE_TYPE.GROUP,
        name: 'Subgroup',
        logic_type: LOGIC_TYPES.OR,
        collapsed: false,
        children: [
          {
            id: 'f21',
            type: NODE_TYPE.FILTER,
            field: 'age',
            operator: OPERATOR.IS_AFTER,
            value: '44',
          },
          {
            id: 'f22',
            type: NODE_TYPE.FILTER,
            field: 'birth_date',
            operator: OPERATOR.IS_AFTER,
            value: '18.02.1991',
          },
        ],
      },
      {
        id: 'g3',
        type: NODE_TYPE.GROUP,
        name: 'Subgroup',
        logic_type: LOGIC_TYPES.OR,
        collapsed: false,
        children: [
          {
            id: 'f31',
            type: NODE_TYPE.FILTER,
            field: 'age',
            operator: OPERATOR.IS_AFTER,
            value: '33',
          },
          {
            id: 'g4',
            type: NODE_TYPE.GROUP,
            name: 'Subgroup',
            logic_type: LOGIC_TYPES.OR,
            collapsed: false,
            children: [
              {
                id: 'f31',
                type: NODE_TYPE.FILTER,
                field: 'age',
                operator: OPERATOR.IS_AFTER,
                value: '20',
              },
              {
                id: 'f32',
                type: NODE_TYPE.FILTER,
                field: 'birth_date',
                operator: OPERATOR.IS_AFTER,
                value: '21.12.2012',
              },
            ],
          },
        ],
      },
    ],
  },
};
