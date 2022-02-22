import { GraduationCap } from 'styled-icons/entypo';

export const AdminDashTopBox = ({ box, index }) => (
  <div className={`
    flex flex-col relative
    items-center
    overflow-hidden shadow-xl 
    rounded-2xl 
    mb-8 p-4
    text-lg
    text-white ${index % 2 ? 'bg-main' : 'bg-main-dark'}
  `}>
    {/* <div className='flex justify-between w-full'> */}
    <div className='relative top-0 flex justify-center space-x-4 w-full'>
      <span className='text-[4em] font-light leading-tight'>{box.value}</span>
      <GraduationCap className='w-12 opacity-40' />
    </div>
    <span>{box.label}</span>
  </div>
);
