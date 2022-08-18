import { useEffect, useState } from 'react';
import InputWithLabel from './InputWithLabel';
import Button from '../../Button';

export const UrlEntry = ({onAddLink}) => {

  const [url, setUrl] = useState()
  const [validUrl, setValidUrl] = useState()

  useEffect(() => {
    setValidUrl(url)
  },[url])

  return (
    <>
      <InputWithLabel 
        onChange={(e) => setUrl(e.target.value)} 
        label="Link URL"
        value={url}
        name="url"
        placeholder="e.g. www.google.com"
      />
      { validUrl && (
        // <>
        //   <label className="block text-gray-500 text-sm font-bold mb-2">
        //     Preview:
        //   </label>
        <div className="flex justify-end">
          <Button className="ml-2" onClick={() => onAddLink(validUrl)}>Add Link</Button>
        </div>
      // </>
      )}
    </>
  );
}

export default UrlEntry