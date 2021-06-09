export default function PageTitle({title, subtitle}) {
  return (
    <div className="w-full border-main border-b-4 py-8 content-center relative bg-white">
      <div className="max-w-screen-lg flex flex-col items-center text-center mx-auto">
        <h1 className="text-4xl text-main-dark mb-2">{title}</h1>
        <h3 className="text-xl text-main">{subtitle}</h3>
        <svg className="w-10 h-10 -bottom-11 absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" preserveAspectRatio="none"><path className="fill-current text-blue" d="M10 10L0 0h20L10 10z"/></svg>
      </div>
    </div>
  )
}