import {Group2} from "@styled-icons/remix-fill/Group2"
import {PeopleTeamToolbox} from "@styled-icons/fluentui-system-filled/PeopleTeamToolbox"
import { Group } from "../../graphql/generated"

interface GroupDictionary {
  [key: string]: {
    name: string
    pluralKey: string
    plural: string
    pluralLabel: string
    label: string
    icon: React.FC,
    indexUrl: string,
    withIndefiniteArticle: string
}
}

export const groupTypes: GroupDictionary = {
  group: {
    name: 'group',
    pluralKey: 'groups',
    plural: 'groups',
    label: "Group",
    pluralLabel: "Groups",
    withIndefiniteArticle: 'a group',
    icon: Group2,
    indexUrl: 'admin/users/groups',
  },
  organisation: {
    name: 'organisation',
    pluralKey: 'organisations',
    plural: 'organisations',
    label: "Organisation",
    pluralLabel: "Organisations",
    withIndefiniteArticle: 'an organisation',
    icon: PeopleTeamToolbox,
    indexUrl: 'admin/users/organisations',
  }
}

export const getGroupType = (group) => {
  return group.isOrganisation ? groupTypes['organisation'] : groupTypes['group']
}

export function getGroupEditUrl(group: Group): string {
  const { id } = group;
  const type = getGroupType(group);
  return `/admin/users/${type.pluralKey}/edit?id=${id}`;
}