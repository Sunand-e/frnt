import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../../editor-js-tools'
// import Layout from './components/Layout';
 
// const MyAnglePicker = () => {
//   const [ angle, setAngle ] = useState();
//   return <AnglePickerControl value={ angle } onChange={ setAngle } />;
// };

const ContentEditor = ({data, onSetData}) => {
    
    return (
        <>
            <EditorJs 
                onChange={onSetData}
                data={data} 
                tools={EDITOR_JS_TOOLS}
            />
            <pre>
                {JSON.stringify(data, undefined, 2)}
            </pre>
        </>
  );
};

export default ContentEditor