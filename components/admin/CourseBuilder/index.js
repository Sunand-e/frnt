import { useState, useEffect, createContext } from "react";

import domReady from "@wordpress/dom-ready";
import { render } from "@wordpress/element";
import { withSelect } from '@wordpress/data';
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  useMutation,
  useQuery
} from "@apollo/client";

import cache from "./graphql/cache";
import { addIconsToLibrary } from "./fontawesome";

import TabPanel from "./components/TabPanel";

import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import BlockWithTitle from "./components/BlockWithTitle";
import LoadingSpinner from "./components/LoadingSpinner";
import "tippy.js/dist/tippy.css";
import "./style.scss";
import PostContext from "./postContext";
import SaveButton from "./components/SaveButton";
import getJWT from "./utils/getToken";
import { UPDATE_JSON_CONTENT } from "./graphql/mutations/UPDATE_JSON_CONTENT";
import { GET_COURSE_DATA } from "./graphql/queries/GET_COURSE_DATA";
import Builder from "./components/Builder";
import AdminSidebar from "./components/AdminSidebar";

addIconsToLibrary();


const httpLink = createHttpLink({
  uri: '/graphql/',
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getJWT();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  connectToDevTools: true,
  link: authLink.concat(httpLink),
  cache,
  // typeDefs
});


const CourseBuilder = () => {
  
  // const { id } = useContext(PostContext)
  
  const postID = document.querySelector('#smartmembers_dashboard').dataset.postId

  const { loading, error, data } = useQuery(GET_COURSE_DATA, {
    variables: { id: postID },
    client
  });

  const [updateJsonContent, { data: courseMutationData }] = useMutation(UPDATE_JSON_CONTENT, {client});

  const handleSaveClick = () => {
    updateJsonContent({ variables: {
      id: postID,
      jsonContent: JSON.stringify(courseData)
    } });
  } 

  const [courseData, setCourseData] = useState(null);
  const [lessonData, setLessonData] = useState(null);

  
  useEffect(() => {
    if(data?.course?.contentJSON) {
      setCourseData(JSON.parse(data.course.contentJSON))
    }
  }, [data])

  return (
    <PostContext.Provider value={{id: postID}}>

    <ApolloProvider client={client}>
      <BlockWithTitle title="Course Builder" className="mt-8">

      <div className="flex p-2">

        {/* <TabPanel className="grow w-9/12 mr-4"> */}
        { data &&
          <Builder
            tabTitle="Course Builder"
            name="course-structure"
            style={{ height: 400 }}
            course={data.course}
          />
        }
          {/* <Editor
            tabTitle="Course Page"
            name="edit-course"
            data={courseData}
            onSetData={(api, newData) => {
              setCourseData(newData);
            }}
          />
          <Editor
            tabTitle="Edit Lesson"
            name="edit-lesson"
            data={lessonData}
            onSetData={(api, newData) => {
              setLessonData(newData);
            }}
          /> */}

        {/* </TabPanel> */}
        <AdminSidebar>

          <SaveButton onClick={() => handleSaveClick()} />

        </AdminSidebar>
      </div>
      </BlockWithTitle>
    </ApolloProvider>
    </PostContext.Provider>

  );
};

export default CourseBuilder
