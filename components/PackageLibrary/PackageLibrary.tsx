import { useQuery } from "@apollo/client"
import { GET_SCORM_MODULES } from "../../graphql/queries/allQueries";
import { GetScormModules } from "../../graphql/queries/__generated__/GetScormModules";
import PackageUploader from "./PackageUploader"
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

interface PackageLibraryProps {
  onItemSelect?: any
}

const PackageLibrary: React.FunctionComponent<PackageLibraryProps> = ({onItemSelect}) => {

  const { loading, error, data: { scormModules } = {} } = useQuery<GetScormModules>(GET_SCORM_MODULES)

  const handleItemDelete = () => {
    // handleModal({title: 'Delete media item', content: 'Delete media item?'})
  }

  if (loading) return <>Loading...</>
  if (error) return <>`Error! ${error}`</>

  return (
    <>
      <PackageUploader />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="overflow-hidden lg:overflow-auto scrollbar:!w-1.5 
                  scrollbar:!h-1.5 scrollbar:bg-transparent 
                  scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded 
                  scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded 
                  dark:scrollbar-track:!bg-slate-500/[0.16] 
                  dark:scrollbar-thumb:!bg-slate-500/50 
                  max-h-96 supports-scrollbars:pr-2 lg:max-h-96">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-main bg-opacity-10">
                  <tr className="bg-main bg-opacity-10">
                    <th
                      scope="col"
                      className="
                      sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 p-0 dark:bg-slate-900 dark:text-slate-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                      "
                      >
                      <div className="py-3 px-6  border-b border-slate-200 dark:border-slate-400/20">
                      Filename
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="
                      sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 p-0 dark:bg-slate-900 dark:text-slate-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                      border-b border-slate-200 dark:border-slate-400/20"
                    >
                      <div className="py-3 px-6 border-b border-slate-200 dark:border-slate-400/20">
                        Uploaded
                      </div>
                    </th>
                  </tr>
                </thead>
                  {/* <tbody className="bg-white divide-y divide-gray-200"> */}
                  <tbody className="">
                  { scormModules.map((module) => (
                    <tr className="cursor-pointer" key={module.id} onClick={() => onItemSelect(module)}>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{module.title}</td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{dayjs(module.createdAt).format('Do MMMM YYYY [at] h:mm A')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PackageLibrary
