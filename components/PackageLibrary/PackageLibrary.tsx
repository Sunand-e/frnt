import { useQuery } from "@apollo/client"
import { Fragment } from "react";
import { GET_SCORM_MODULES } from "../../graphql/queries/allQueries";
import { GetScormModules } from "../../graphql/queries/__generated__/GetScormModules";
import useModal from "../../hooks/useModal";
import PackageUploader from "./PackageUploader"

interface PackageLibraryProps {
  onItemSelect?: any
}

const PackageLibrary: React.FunctionComponent<PackageLibraryProps> = ({onItemSelect}) => {

  
  const { handleModal } = useModal()

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
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Filename
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Uploaded
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  { scormModules.map((module) => (
                    <tr className="cursor-pointer" key={module.id} onClick={() => onItemSelect(module)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{module.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{module.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PackageLibrary