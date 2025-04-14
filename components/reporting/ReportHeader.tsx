import { ReactNode } from "react";

interface ConditionalHeaderWrapperProps {
  simple?: boolean
  children?: ReactNode
}
const ConditionalHeaderWrapper = ({
  simple,
  children
}: ConditionalHeaderWrapperProps) => (
  <>
    {!simple ? (
      <div className="mb-4 bg-white shadow rounded-md p-6">
        {children}
      </div>
    ) : <>{children}</>}
  </>
)

interface ReportHeaderProps {
  simple?: boolean
  title?: ReactNode
}
const ReportHeader = ({
  simple = false,
  title
}: ReportHeaderProps) => {

  return (
    <ConditionalHeaderWrapper simple={simple}>
      <h3 className="text-main-secondary font-semibold text-center mb-3 sm:text-left">
        {title}
      </h3>
    </ ConditionalHeaderWrapper>
  )
};

export default ReportHeader;
