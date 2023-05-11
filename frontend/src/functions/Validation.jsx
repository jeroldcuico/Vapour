export function Validation({ fields }) {
  const errors = {};
  fields.forEach((field) => {
    const { name, value, validations } = field;

    validations.forEach((validation) => {
      const { rule, message } = validation;
      if (rule && !rule(value)) {
        if (!errors[name]) {
          errors[name] = [];
        }
        errors[name].push(message);
      }
    });
  });
  return errors;
}
