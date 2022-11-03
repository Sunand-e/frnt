import Link from "next/link"

const AdminDashCard = ({card}) => (
  (
    <div key={card.label} className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5 pb-3">
        <div className="flex items-center">
          <div className="shrink-0">
            <card.IconComponent className="h-6 w-8 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{card.label}</dt>
              <dd>
                <div className="text-3xl font-medium text-gray-900">{card.value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 pt-1">
        <div className="text-sm">
          <Link href={card.href} className="font-medium text-main hover:text-main/80">
            
              View all
            
          </Link>
        </div>
      </div>
    </div>
  )
)

export default AdminDashCard
