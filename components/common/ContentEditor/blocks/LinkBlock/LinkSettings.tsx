import produce from "immer";
import { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../inputs/TextInput";
import { useBlockStore } from "../../useBlockStore";
import { LinkBlockProps } from "./LinkBlock";

interface LinkFormValues {
  buttonText?: string;
  url?: string;
}

export const LinkSettings: FunctionComponent<LinkBlockProps> = ({ block }) => {

  const { register, watch, control } = useForm<LinkFormValues>({defaultValues: {
    ...block.properties
  }});

  const updateBlock = useBlockStore(state => state.updateBlock)

  useEffect(() => {
    const subscription = watch((data) => {
      const newBlock = produce(block, draft => {
        draft.id = block.id
        draft.type = draft.type
        draft.properties = {
          ...block.properties,
          url: data.url,
          buttonText: data.buttonText,
        };
      });
      updateBlock(newBlock);
    })
    return () => subscription.unsubscribe()

  },[watch, block.properties])

  return (
    <form className='h-full w-full max-w-sm flex flex-col space-y-3 pt-2 px-1 text-sm'>
      <TextInput
        label="Button Text"
        inputAttrs={register("buttonText", {
        })}
      />
      <TextInput
        label="URL"
        inputAttrs={register("url", {
        })}
        type="url"
      />
    </form>
  )
}

export default LinkSettings;
