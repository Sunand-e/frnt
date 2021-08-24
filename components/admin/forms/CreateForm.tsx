import { Form } from "formik"
import React from 'react';
import Button from '../../Button';

const CreateForm = ({formik, children, backLink, entityName}) => (
  <Form>
    { children }
    <Button type="submit">{`Save new ${entityName}`}</Button>
  </Form>
)

export default CreateForm;
