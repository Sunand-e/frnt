import {Group2} from "@styled-icons/remix-fill/Group2"
import {PeopleTeamToolbox} from "@styled-icons/fluentui-system-regular/PeopleTeamToolbox"

export const groupTypes = {
  group: {
    name: 'course',
    pluralKey: 'courses',
    plural: 'courses',
    label: "Course",
    icon: Group2,
    indexUrl: 'admin/users/groups',
  },
  organisation: {
    name: 'organisation',
    pluralKey: 'organisations',
    plural: 'organisations',
    label: "Organisation",
    pluralLabel: "Organisations",
    icon: PeopleTeamToolbox,
    indexUrl: 'admin/organisations',
  }
}

