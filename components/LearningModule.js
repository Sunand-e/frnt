
import { useQuery, gql } from '@apollo/client';

const MODULE_URL_QUERY = gql`
query iFrame {
  __schema {
    __typename
  }
}
`;
export default function LearningModule({ url }) {

  const { loading, error, data } = useQuery(MODULE_URL_QUERY);

  return (
    <>
    { data && (
      <div 
        className="relative h-0 overflow-hidden max-w-full" 
        style={{
          'paddingBottom': '56.25%'
        }}
      >
        <iframe 
          src={data.learningModuleIframe} 
          className="absolute top-0 left-0 w-full h-full"
        /> 
      </div>
    )}
    </>
  )
}
