export default function Sidebar({children}) {

  return (
    
    <div className="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
      <div className="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pt-10 pb-6 top-18">
        <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">On
            this page</h5>
        <ul className="overflow-x-hidden text-gray-500 font-medium">
          <li><a href="#class-reference"
                  className="block transform transition-colors duration-200 py-2 hover:text-gray-900 text-gray-900">Default
                  class reference</a></li>
          <li><a href="#row"
                  className="block transform transition-colors duration-200 py-2 hover:text-gray-900">Row</a>
          </li>
          <li><a href="#row-reversed"
                  className="block transform transition-colors duration-200 py-2 hover:text-gray-900">Row
                  reversed</a></li>
          <li><a href="#column"
                  className="block transform transition-colors duration-200 py-2 hover:text-gray-900">Column</a>
          </li>
          <li><a href="#column-reversed"
                  className="block transform transition-colors duration-200 py-2 hover:text-gray-900">Column
                  reversed</a></li>
          <li><a href="#responsive"
                  className="block transform transition-colors duration-200 py-2 hover:text-gray-900">Responsive</a>
          </li>
          <li><a href="#customizing"
                  className="block transform transition-colors duration-200 py-2 hover:text-gray-900">Customizing</a>
          </li>
          <li className="ml-4"><a href="#variants"
                  className="block py-2 transition-colors duration-200 hover:text-gray-900 font-medium">Variants</a>
          </li>
          <li className="ml-4"><a href="#disabling"
                  className="block py-2 transition-colors duration-200 hover:text-gray-900 font-medium">Disabling</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
