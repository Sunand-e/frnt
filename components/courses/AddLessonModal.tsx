import { Form, Formik, useField } from "formik"
import useCreateLesson from '../../hooks/lessons/useCreateLesson';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}
const AddLessonModal = ({sectionId}) => {

  const { createLesson } = useCreateLesson(sectionId)
  
  return (
    <Formik
      initialValues={{
        title: ''
      }}
      onSubmit={values => createLesson(values)}
    >
      
      {formik => (
        <Form>
          <TextInput
            name='title'
            label=""
            placeholder='Untitled lesson'
          />
          <button type="submit" className={'mt-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-main text-base font-medium text-white hover:bg-main-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main sm:text-sm'}>
            {`Create new lesson`}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AddLessonModal
