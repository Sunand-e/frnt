import NumberPropertyInput from "./NumberPropertyInput";

interface FourNumberInputProps {
  label: string;
}

export default function FourNumberInput({
  label,
}: FourNumberInputProps) {
  return (
    <>
      { label && <span className="text-sm font-medium text-secondary">{ label }</span> }
      <div className={`flex w-full items-center space-x-4 mb-2`}>
        <NumberPropertyInput 
          label="Top"
          step={1}
          unit="px"
        />
        <NumberPropertyInput
          label="Bottom"
          step={1}
          unit="px"
        />
      </div>

      <div className={`flex w-full items-center space-x-4`}>
        <NumberPropertyInput 
          label="Left"
          step={1}
          unit="px"
        />
        <NumberPropertyInput
          label="Right"
          step={1}
          unit="px"
        />
      </div>
    </>
  );
}
