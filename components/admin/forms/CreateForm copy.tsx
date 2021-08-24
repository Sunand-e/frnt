import { useMutation, useQuery } from '@apollo/client';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import React from 'react';
import { CREATE_GROUP } from '../../../graphql/mutations/allMutations';
import TextInput from '../../TextInput';
import Button from '../../Button';
import { CreateGroup } from '../../../graphql/mutations/__generated__/CreateGroup';
import { GET_GROUPS } from '../../../graphql/queries/allQueries';
import { GetGroups } from '../../../graphql/queries/__generated__/GetGroups';

const GroupCreateForm = () => {

  const { loading, error, data } = useQuery(GET_GROUPS);

  const [createGroup, newGroup] = useMutation<CreateGroup, CreateGroup>(
    CREATE_GROUP,
    {
      update(cache, { data: { createGroup } }) {
        // alert(JSON.stringify(createGroup))
        const data = cache.readQuery<GetGroups>({
          query: GET_GROUPS
        });
        cache.writeQuery({
          query: GET_GROUPS,
          data: {
            groups: [createGroup.group, ...data.groups]
          }
        });
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
            label="Group name"
            name="name"
            type="text" />
          <Button type="submit">Add group</Button>
        </Form>
      )}
    </Formik>
  );
};
export default CreateForm;
