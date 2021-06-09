export default function PageContent({children, width}) {
  return (
      <div className={`${width !== 'full' && 'max-w-screen-xl'} px-8 w-full mx-auto flex justify-between my-9 mt-14`}>
          { children }
      </div>
  )
}