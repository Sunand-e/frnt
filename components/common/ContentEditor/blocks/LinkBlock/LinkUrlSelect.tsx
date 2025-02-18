import { useState } from 'react';
import InputWithLabel from '../../../inputs/InputWithLabel';
import LinkPreview from '../../../LinkPreview';
import Button from '../../../Button';

interface LinkUrlSelectProps {
  onAddLink: (url: string, button_text: string) => void;
}

export const LinkUrlSelect = ({ onAddLink }: LinkUrlSelectProps) => {

  const [url, setUrl] = useState()
  const [button_text, setButtonUrl] = useState()
  const [validUrl, setValidUrl] = useState()

  return (
    <>
      <InputWithLabel
        onChange={(e: { target: { value: (prevState: undefined) => undefined; }; }) => setButtonUrl(e.target.value)}
        label="Button Text"
        value={button_text}
        name="button_text"
        placeholder="Enter Button Text..."
        type="text"
      />
      <InputWithLabel
        onChange={(e: { target: { value: (prevState: undefined) => undefined; }; }) => setUrl(e.target.value)}
        label="URL"
        value={url}
        name="url"
        placeholder="Enter URL..."
        type="url"
      />
      {url && ( <LinkPreview setValidUrl={setValidUrl} url={url} /> )}
      <div className="flex justify-end">
        <Button className="ml-2" disabled={!(validUrl && button_text)} onClick={() => onAddLink(validUrl, button_text) }>Add Link</Button>
      </div>
    </>
  );
}

export default LinkUrlSelect;