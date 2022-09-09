import { Form } from "formik"
import React from 'react';
import Button from '../../Button';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';

const EditForm = ({formik, children, backLink, entityName}) => (
  <Form>
    { children }
    <div className="flex space-x-4">
      <Link href={backLink} passHref>
        <ButtonLink displayType="cancel">Cancel</ButtonLink>
      </Link>

      <Button type="submit">{`Update ${entityName}`}</Button>
    </div>

  </Form>
)

export default EditForm