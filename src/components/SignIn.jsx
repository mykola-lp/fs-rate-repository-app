import { View, StyleSheet } from 'react-native';
import { useFormik, FormikProvider } from 'formik';

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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
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