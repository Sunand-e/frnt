import CalendarIcon from '@heroicons/react/20/solid/CalendarIcon'
import EllipsisHorizontalIcon from '@heroicons/react/20/solid/EllipsisHorizontalIcon'
import MapPinIcon from '@heroicons/react/20/solid/MapPinIcon'
import { Menu, Transition } from '@headlessui/react'
import {Fragment} from "react";
import UserDashTitles from "./UserDashTitles";

const meetings = [
    {
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Mark Oxley',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
    {
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Mark Oxley',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
    {
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Mark Oxley',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
    // More meetings...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function EventListBlock() {
    return (
        <UserDashTitles title="Events">
            <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 bg-white shadow px-4 rounded-md">
                {meetings.map((meeting, index) => (
                    <li key={index} className="relative flex space-x-6 py-6 xl:static">
                        <img src={meeting.imageUrl} alt="" className="h-14 w-14 flex-none rounded-full" />
                        <div className="flex-auto">
                            <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{meeting.name}</h3>
                            <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                                <div className="flex items-start space-x-3">
                                    <dt className="mt-0.5">
                                        <span className="sr-only">Date</span>
                                        <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <time dateTime={meeting.datetime}>
                                            {meeting.date} at {meeting.time}
                                        </time>
                                    </dd>
                                </div>
                                <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                    <dt className="mt-0.5">
                                        <span className="sr-only">Location</span>
                                        <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>{meeting.location}</dd>
                                </div>
                            </dl>
                        </div>
                        <Menu as="div" className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center">
                            <div>
                                <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                                    <span className="sr-only">Open options</span>
                                    <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Edit
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Cancel
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </li>
                ))}
            </ol>
        </UserDashTitles>
    )
}
