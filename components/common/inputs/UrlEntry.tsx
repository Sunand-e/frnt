import { useEffect, useState } from 'react';
import InputWithLabel from './InputWithLabel';
import Button from '../../Button';
import LinkPreview from '../LinkPreview';

export const UrlEntry = ({onAddLink}) => {

  const [url, setUrl] = useState()
  const [validUrl, setValidUrl] = useState()

  return (
    <>
      <InputWithLabel 
        onChange={(e) => setUrl(e.target.value)} 
        label="Link URL"
        value={url}
        name="url"
        placeholder="e.g."
        type="url"
      />
      { url && (
        <>
          <LinkPreview setValidUrl={setValidUrl} url={url} />
          { validUrl && (
          <div className="flex justify-end">
            <Button className="ml-2" onClick={() => onAddLink(validUrl)}>Add Link</Button>
          </div>
          )}
        </>
      )}
    </>
  );
}

export default UrlEntry