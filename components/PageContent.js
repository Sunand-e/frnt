export default function PageContent({children, width}) {
  return (
      // <div className={`${width !== 'full' && 'max-w-screen-xl'} px-12 w-full mx-auto flex justify-between my-9 mt-14`}>
      <div className={`px-16 w-full mx-auto flex justify-between my-9 mt-9`}>
          { children }
      </div>
  )
}