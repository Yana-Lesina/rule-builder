import * as Yup from 'yup';
import { VALIDATION_ERROR_MESSAGES } from 'consts/validationMessages';
import type { LogicType } from 'types/general';
import { FilterSchema } from './FilterSchema';

export const GroupSchema = Yup.object({
  name: Yup.string().required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD),
  logic_type: Yup.string<LogicType>().required(VALIDATION_ERROR_MESSAGES.REQUIRED_FIELD),
  children: Yup.array(FilterSchema).min(2),
});
