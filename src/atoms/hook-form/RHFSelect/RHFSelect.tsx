import { useFormContext, Controller } from 'react-hook-form';
import type { Theme, SxProps } from '@mui/material/styles';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
  PaperPropsSx?: SxProps<Theme>;
};

export const RHFSelect = ({ name, native, maxHeight = 220, helperText, children, PaperPropsSx, ...other }: RHFSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          slotProps={{
            select: {
              native,
              MenuProps: {
                PaperProps: {
                  sx: {
                    ...(!native && {
                      maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                    }),
                    ...PaperPropsSx,
                  },
                },
              },
              sx: { textTransform: 'capitalize' },
            },
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
};
