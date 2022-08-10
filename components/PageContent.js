export default function PageContent({className='', children}) {
  return (
      // <div className={`${width !== 'full' && 'max-w-screen-xl'} px-12 w-full mx-auto flex justify-between my-9 mt-14`}>
      <div className={`${className} px-16 w-full mx-auto flex justify-between mt-4 `}>
          { children }
      </div>
  )
}
