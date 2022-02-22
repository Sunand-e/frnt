export const AdminDashTopBox = ({ box, index }) => (
  <div className={`
    relative overflow-hidden shadow-xl mb-8 
    rounded-2xl 
    text-white ${index % 2 ? 'bg-main' : 'bg-main-dark'}
  `}>
    <div className={`
      flex flex-col relative
      items-center
      p-4
      text-lg
    `}>
    {/* <div className='flex justify-between w-full'> */}
      <span className='text-[4em] font-light leading-tight'>{box.value}</span>
      <span>{box.label}</span>
    </div>
    <box.IconComponent className='absolute w-full h-full top-0 opacity-10 p-3' />

  </div>
);
