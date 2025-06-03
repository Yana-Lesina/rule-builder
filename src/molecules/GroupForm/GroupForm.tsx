import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { nanoid } from 'nanoid';
import { Button, IconButton, MenuItem, Stack } from '@mui/material';
import { RHFSelect } from 'atoms/hook-form/RHFSelect/RHFSelect';
import { RHFTextField } from 'atoms/hook-form/RHFTextField/RHFTextField';
import { Form } from 'atoms/hook-form/Form/Form';
import { useFieldArray, useFormContext, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { LOGIC_TYPES, NODE_TYPE } from 'types/general';
import { FilterFormFields } from 'molecules/FilterFormFields/FilterFormFields';
import { _logicTypes } from 'mock-data/forms';
import { GroupSchema } from 'schemas/GroupSchema';

interface FiltersListProps {
  name: string;
}

const FiltersList = ({ name }: FiltersListProps) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Stack direction="column" spacing={3}>
      {fields.map((field, index) => (
        <Stack
          key={field.id}
          sx={{
            border: '1px solid #8A8D91',
            borderRadius: '1rem',
          }}
        >
          <FilterFormFields nestedNamePart={`${name}.${index}`} />
          {index > 2 && (
            <IconButton type="button" onClick={() => remove(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          )}
        </Stack>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            id: nanoid(),
            type: NODE_TYPE.FILTER,
            field: '',
            operator: '',
            value: '',
          })
        }
      >
        Add Filter
      </Button>
    </Stack>
  );
};

// ---------------------------------------

interface GroupFormProps<T extends FieldValues> {
  id: string;
  values?: T;
  onSubmit: SubmitHandler<T>;
}

export const GroupForm = <T extends FieldValues>({ id, values, onSubmit }: GroupFormProps<T>) => {
  return (
    <Form id={id} schema={GroupSchema} defaultValues={values ?? _defaultValues} onSubmit={onSubmit}>
      <RHFTextField name="name" label="Group name" />
      <RHFSelect name="logic_type" label="Logic Type">
        {_logicTypes.map((logicType) => (
          <MenuItem key={logicType.id} value={logicType.label}>
            {logicType.label}
          </MenuItem>
        ))}
      </RHFSelect>
      <FiltersList name="children" />
    </Form>
  );
};

// ----------------------------------------------

const _defaultValues = {
  name: '',
  logic_type: LOGIC_TYPES.AND,
  children: [
    ...new Array(2).fill({
      id: nanoid(),
      type: NODE_TYPE.FILTER,
      field: '',
      operator: '',
      value: '',
    }),
  ],
};
