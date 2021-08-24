import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import React from 'react';
import { CREATE_GROUP } from '../../../graphql/mutations/allMutations';
import TextInput from '../../TextInput';
import Button from '../../Button';
import { CreateGroup, CreateGroupVariables } from '../../../graphql/mutations/__generated__/CreateGroup';
import { GET_GROUPS } from '../../../graphql/queries/allQueries';
import { GetGroups, GetGroups_groups } from '../../../graphql/queries/__generated__/GetGroups';
import CreateForm from '../forms/CreateForm';
import { noticesVar } from '../../../graphql/cache';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

const GroupCreateForm = () => {

  const { loading, error, data } = useQuery(GET_GROUPS);

  const router = useRouter()
  const notices = useReactiveVar(noticesVar)
  const backLink = '/admin/users/groups'
  
  const [createGroup, newGroup] = useMutation<CreateGroup, CreateGroupVariables>(
    CREATE_GROUP,
    {
      update(cache, { data: { createGroup } } ) {
        // alert(JSON.stringify(createGroup))
        const data = cache.readQuery<GetGroups>({
          query: GET_GROUPS
        })
        cache.writeQuery({
          query: GET_GROUPS,
          data: { 
            groups: [createGroup.group, ...data.groups]
          }
        })
      }
    }
  );

  return (
    <Formik
      initialValues={{
        name: ''
      }}
      onSubmit={values => {
        createGroup({ 
          variables: { name: values.name },
          optimisticResponse: {
            createGroup: {
              __typename: 'CreateGroupPayload',
              group: {
                __typename: 'Group',
                id: Math.floor(Math.random() * 10000) + '',
                name: values.name,
                createdAt: '',
                updatedAt: '',
                users: [],
                _deleted: false,
              }

            }
          }
          // refetchQueries: [{ query: GET_GROUPS }]
        }).catch(res => {
          // TODO: do something if there is an error!!
        })
        noticesVar([
          {
            content: `The group '${values.name}' has been created`,
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
        <CreateForm 
          formik={formik}
          backLink={'/admin/users/groups'}
          entityName={'group'}
        >
          <TextInput
            label="Group name"
            name="name"
            type="text"
          />
        </CreateForm>
      )}
    </Formik>
  );
}

export default GroupCreateForm