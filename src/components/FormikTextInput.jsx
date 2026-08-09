import { TextInput, StyleSheet } from 'react-native';
import { useField } from 'formik';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 15,
    marginBottom: 15,
  },
  containerError: {
    borderColor: 'red',
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <TextInput
      style={[styles.container, showError && styles.containerError]}
      value={field.value}
      onChangeText={(value) => helpers.setValue(value)}
      onBlur={() => helpers.setTouched(true)}
      {...props}
    />
  );
};

export default FormikTextInput;