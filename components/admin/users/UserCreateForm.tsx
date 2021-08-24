import { useMutation } from '@apollo/client';
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import React from 'react';
import { CREATE_USER } from '../../../graphql/mutations/allMutations';
import TextInput from '../../TextInput';
import Button from '../../Button';
import { CreateUser } from '../../../graphql/mutations/__generated__/CreateUser';

const UserCreateForm = () => {

  const [createUser, { data }] = useMutation<CreateUser>(CREATE_USER);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2))
        createUser({
          variables: { 
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email
          }
        });
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required')
      })}
    >
      {formik => (
        <Form>
          <TextInput
            label="First name"
            name="firstName"
            type="text"
          />
          <TextInput
            label="Last name"
            name="lastName"
            type="text"
          />
          <TextInput
            label="Email address"
            name="email"
            type="email"
          />
          <Button type="submit">Add user</Button>
        </Form>
      )}
    </Formik>
  );
}

export default UserCreateForm