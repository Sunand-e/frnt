import { Icon } from '@wordpress/components';

const arrowBarClass = "-m-2 bg-main-transparent3 transition-width hover:bg-main-transparent1 w-12 hover:w-24 flex justify-center items-center pointer-events-auto"
const HorizontalScrollArrows = () => {
  return (
    <div class="flex w-full h-full justify-between absolute pr-4 pb-4 pointer-events-none">
      <div className={arrowBarClass}>
        <Icon icon="arrow-left-alt2" />
      </div>
      <div className={arrowBarClass}>
        <Icon icon="arrow-right-alt2" />
      </div>
    </div>
  )
}

export default HorizontalScrollArrows;