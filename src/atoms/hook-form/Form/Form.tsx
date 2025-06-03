import { yupResolver } from '@hookform/resolvers/yup';
import { type ReactNode } from 'react';
import { FormProvider, useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import type { ObjectSchema } from 'yup';

interface FormProps<T extends FieldValues> {
  id: string;
  defaultValues: T;
  schema?: ObjectSchema<T>;
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({ id, defaultValues, schema, children, onSubmit }: FormProps<T>) => {
  const methods = useForm({
    defaultValues,
    resolver: schema ? yupResolver(schema) : null,
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const submit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={(e) => {
          e.preventDefault();

          if (!isValid) {
            e.stopPropagation();
          }
          void submit();
        }}
      >
        {children}
      </form>
    </FormProvider>
  );
};
