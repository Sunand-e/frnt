import { useMutation, useReactiveVar } from '@apollo/client';
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import React from 'react';
import { UPDATE_GROUP } from '../../../graphql/mutations/allMutations';
import TextInput from '../../TextInput';
import Button from '../../Button';
import Link from 'next/link';
import ButtonLink from '../../ButtonLink';
import EditForm from '../forms/EditForm';
import { useRouter } from 'next/router';
import { noticesVar } from '../../../graphql/cache';
import { v4 as uuidv4 } from 'uuid';

const GroupEditForm = ({group}) => {
  
  const [editGroup, updatedGroup] = useMutation<UpdateGroup, UpdateGroup>(
    UPDATE_GROUP
    );
    
    const router = useRouter()
    const notices = useReactiveVar(noticesVar)
    const backLink = '/admin/users/groups'

    return (
    <Formik
      initialValues={group}
      // initialValues={{
      //   id: group.id,
      //   name: group.name
      // }}
      onSubmit={values => {
        editGroup({
          variables: { id: group.id, name: values.name },
          optimisticResponse: {
            updateGroup: {
              __typename: 'UpdateGroupPayload',
              group: {
                __typename: 'Group',
                id: group.id,
                name: values.name,
                _deleted: false,
                createdAt: '',
                updatedAt: '',
                users: [],
              }
            }
          }
          // refetchQueries: [{ query: GET_GROUPS }]
        }).catch(res => {
          // TODO: do something if there is an error!!
        })
        noticesVar([
          {
            content: `Group '${values.name}' has been updated`,
            id: uuidv4()
          },
          ...notices
        ])
        router.push(backLink)
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required')
      })}
    >
      {formik => (
        <EditForm 
          formik={formik}
          backLink={backLink}
          entityName={'group'}
        >
          <TextInput
            label="Group name"
            name="name"
            type="text"
          />
        </EditForm>
      )}
    </Formik>
  );
}

export default GroupEditForm