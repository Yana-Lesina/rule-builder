import { MenuItem, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RHFSelect } from 'atoms/hook-form/RHFSelect/RHFSelect';
import { RHFTextField } from 'atoms/hook-form/RHFTextField/RHFTextField';
import { _fieldNames, _operators } from 'mock-data/forms';

interface FormFields {
  field: string;
  operator: string;
  value: string;
}

interface FilterFormFieldsProps {
  nestedNamePart?: string;
}

const StyledStack = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: 5,
  padding: '1rem 2rem',
  minWidth: '30vw',
}));

export const FilterFormFields = ({ nestedNamePart }: FilterFormFieldsProps) => {
  const names = ['field', 'operator', 'value'].reduce((acc, currKey) => {
    return {
      ...acc,
      [currKey]: nestedNamePart ? `${nestedNamePart}.${currKey}` : currKey,
    };
  }, {} as FormFields);

  return (
    <StyledStack>
      <RHFSelect name={names.field} label={'Field'}>
        {_fieldNames.map((fieldName) => (
          <MenuItem key={fieldName.id} value={fieldName.label}>
            {fieldName.label}
          </MenuItem>
        ))}
      </RHFSelect>
      <RHFSelect name={names.operator} label={'Operator'}>
        {_operators.map((operator) => (
          <MenuItem key={operator.id} value={operator.label}>
            {operator.label}
          </MenuItem>
        ))}
      </RHFSelect>
      <RHFTextField name={names.value} label={'Value'} />
    </StyledStack>
  );
};
