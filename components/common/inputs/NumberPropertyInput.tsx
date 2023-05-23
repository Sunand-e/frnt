import styles from "./NumberPropertyInput.module.scss";

interface NumberPropertyInputProps {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  inputAttrs?: any;
  className?: string;
}

export default function NumberPropertyInput({
  label,
  inputAttrs,
  min,
  max,
  step,
  unit,
  className,
}: NumberPropertyInputProps) {
  return (
    <label className={`${className} flex w-full items-center space-x-1 text-sm basis-1/2`}>
      <span>{`${label}: `}</span>
      <input
        className="
        px-1
        p-1
        block
        w-full
        rounded-md
        border-gray-300 hover:border-gray-400/60
        shadow-sm
        focus:border-main focus:ring focus:ring-main/50
      "
        type="number"
        name={label}
        min={min}
        max={max}
        step={step}
        { ...inputAttrs }
      />
      {!!unit && <div className={styles.unit}>{unit}</div>}
    </label>
  );
}
