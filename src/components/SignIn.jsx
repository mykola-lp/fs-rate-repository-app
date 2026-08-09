import { View, StyleSheet } from 'react-native';
import { useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <View style={styles.container}>
        <FormikTextInput
          name="username"
          placeholder="Username"
        />

        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />

        <Button onPress={formik.handleSubmit}>Sign in</Button>
      </View>
    </FormikProvider>
  );
};

export default SignIn;