type JSONValue = string | number | boolean | null | { [k: string]: JSONValue };
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type FormData = { [k: string]: JSONValue };
export type Rules<T> = Rule<T>[];
type Rule<T> = {
  key: keyof T;
  message: string;
} & (
  | {
      type: 'required';
    }
  | {
      type: 'length';
      min?: number;
      max?: number;
    }
  | {
      type: 'pattern';
      pattern: RegExp;
    }
);

export type FormErrors<T> = {
  [k in keyof T]?: string[];
};

const isEmpty = (value: JSONValue) => {
  return value === undefined || value === null || value === '';
};

const validateRule = <T extends FormData>(
  data: T,
  rule: Rule<T>
): string | undefined => {
  const { key, message } = rule;
  const value = data[key];

  switch (rule.type) {
    case 'required':
      if (isEmpty(value)) return message;
      break;
    case 'length':
      if (!isEmpty(value)) {
        if (rule.min && value!.toString().length < rule.min) return message;
        if (rule.max && value!.toString().length > rule.max) return message;
      }
      break;
    case 'pattern':
      if (!rule.pattern.test(value!.toString())) return message;
      break;
    default:
      break;
  }
};

export const validate = <T extends FormData>(
  data: T,
  rules: Rules<T>
): FormErrors<T> => {
  const keys = Object.keys(data) as (keyof T)[];
  const error = {} as FormErrors<T>;
  keys.forEach((key) => {
    error[key] = [];
  });
  // 遍历 rules
  for (let i = 0; i < rules.length; i++) {
    const message = validateRule<T>(data, rules[i]);
    if (typeof message === 'string') {
      error[rules[i].key]?.push(message);
    }
  }

  return error;
};
