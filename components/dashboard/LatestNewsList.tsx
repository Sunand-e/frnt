// tailwind.config.js
// module.exports = {
//         // ...
//         plugins: [
//             // ...
//             require('@tailwindcss/line-clamp'),
//         ],
//     }*/
import UserDashTitles from "./UserDashTitles";

const messages = [
    {
        subject: 'Velit placeat sit ducimus non sed',
        sender: 'Gloria Roberston',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        subject: 'Velit placeat sit ducimus non sed',
        sender: 'Gloria Roberston',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    },
    {
        subject: 'Velit placeat sit ducimus non sed',
        sender: 'Gloria Roberston',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
        preview:
            'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
    }
]

export default function LatestNewsBlock() {
    return (
        <UserDashTitles title="Latest News">
            <ul role="list" className="divide-y divide-gray-200 bg-white shadow rounded-md">
                {messages.map((message, index) => (
                    <li
                        key={index}
                        className="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    >
                        <div className="flex justify-between space-x-3">
                            <div className="min-w-0 flex-1">
                                <a href="#" className="block focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true"/>
                                    <p className="text-sm font-medium text-gray-900 truncate">{message.sender}</p>
                                    <p className="text-sm text-gray-500 truncate">{message.subject}</p>
                                </a>
                            </div>
                            <time dateTime={message.datetime}
                                  className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                                {message.time}
                            </time>
                        </div>
                        <div className="mt-1">
                            <p className="line-clamp-2 text-sm text-gray-600">{message.preview}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </UserDashTitles>
    )
}
