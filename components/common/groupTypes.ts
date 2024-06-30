import {Group2} from "@styled-icons/remix-fill/Group2"
import {PeopleTeamToolbox} from "@styled-icons/fluentui-system-regular/PeopleTeamToolbox"

interface GroupDictionary {
  [key: string]: {
    name: string
    pluralKey: string
    plural: string
    pluralLabel: string
    label: string
    icon: React.FC,
    indexUrl: string,
}
}

export const groupTypes: GroupDictionary = {
  group: {
    name: 'group',
    pluralKey: 'groups',
    plural: 'groups',
    label: "Group",
    pluralLabel: "Groups",
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
    indexUrl: 'admin/users/organisations',
  }
}

