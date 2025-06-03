import * as Yup from 'yup';
import { VALIDATION_ERROR_MESSAGES } from 'consts/validationMessages';
import type { FilterNode, GroupNode } from 'types/general';

export const FilterSchema = Yup.object<FilterNode | GroupNode>({
  field: Yup.string().required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD),
  operator: Yup.string().required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD),
  value: Yup.string().required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD),
});
