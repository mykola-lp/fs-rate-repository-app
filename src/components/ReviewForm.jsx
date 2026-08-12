import { View, StyleSheet } from 'react-native';
import { useFormik, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Button from './Button';

import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <View style={styles.container}>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
        <FormikTextInput name="repositoryName" placeholder="Repository name" />

        <FormikTextInput
          name="rating"
          placeholder="Rating between 0 and 100"
          keyboardType="numeric"
        />

        <FormikTextInput
          name="text"
          placeholder="Review"
          multiline
        />

        <Button onPress={formik.handleSubmit}>Create a review</Button>
      </View>
    </FormikProvider>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });

      const repositoryId = data?.createReview?.repositoryId;
      if (repositoryId) {
        navigate(`/repositories/${repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;