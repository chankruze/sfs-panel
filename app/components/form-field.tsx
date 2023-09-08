import { useEffect, useState, type ComponentProps, type FC } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

type FormFieldProps = ComponentProps<'input'> & {
  label?: string;
  onChange: (...args: any) => any;
  error?: string;
};

export const FormField: FC<FormFieldProps> = ({
  id,
  name,
  value,
  onChange,
  error,
  label,
  placeholder,
  type = 'text',
}) => {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {label ? (
        <Label htmlFor={id} className="capitalize">
          {label}
        </Label>
      ) : null}
      <Input
        id={id}
        name={name}
        type={type}
        onChange={(e) => {
          onChange(e);
          setErrorText('');
        }}
        value={value}
        placeholder={placeholder}
      />
      {errorText ? (
        <p className="font-mono text-sm text-red-400">{errorText}</p>
      ) : null}
    </div>
  );
};
