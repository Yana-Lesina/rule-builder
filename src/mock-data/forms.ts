import { LOGIC_TYPES, OPERATOR } from 'types/general';

interface OptionValue {
  id: string;
  label: string;
}

export const _fieldNames: OptionValue[] = [
  { id: '1', label: 'gender' },
  { id: '2', label: 'birth_date' },
  { id: '3', label: 'channel' },
  { id: '4', label: 'age' },
];

export const _operators: OptionValue[] = Object.values(OPERATOR).map((op, id) => ({
  id: String(id),
  label: op,
}));

export const _logicTypes: OptionValue[] = Object.values(LOGIC_TYPES).map((op, id) => ({
  id: String(id),
  label: op,
}));
