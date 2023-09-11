import classNames from "../../../utils/classNames";

export const Image = ({className, ...props}) => {

  return (
    <>
      <img
        { ...props }
        className={classNames(
          className,
          `mx-auto block max-w-full px-1 w-full borderRadius[3px] object-cover boxShadow[0 0 0 1px rgb(59,130,249)]`
        )}
      />
    </>
  );
}

export default Image