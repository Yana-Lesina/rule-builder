import { Form } from 'atoms/hook-form/Form/Form';
import { type FieldValues } from 'react-hook-form';
import { FilterFormFields } from 'molecules/FilterFormFields/FilterFormFields';
import { FilterSchema } from 'schemas/FilterSchema';

interface FilterFormProps<T extends FieldValues> {
  id: string;
  values?: T;
  onSubmit: (data: T) => void;
}

export const FilterForm = <T extends FieldValues>({ id, values, onSubmit }: FilterFormProps<T>) => {
  return (
    <Form id={id} schema={FilterSchema} defaultValues={values ?? _defaultValues} onSubmit={onSubmit}>
      <FilterFormFields />
    </Form>
  );
};

// ================================================================

const _defaultValues = {
  field: '',
  operator: '',
  value: '',
};
