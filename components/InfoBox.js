export default function InfoBox({ className, children }) {

  return (
    <div className={`border-t-8 border-blue text-blue-dark shadow-lg p-6 mb-8 ${className}`}>
      {children}
    </div>
  )

}
