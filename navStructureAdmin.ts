import { Video } from '@styled-icons/fluentui-system-filled/Video'
import { Speaker2 } from '@styled-icons/fluentui-system-filled/Speaker2'
import { Document } from '@styled-icons/fluentui-system-filled/Document'
import { Category } from '@styled-icons/material-rounded/Category'
import { Library } from "@styled-icons/ionicons-solid/Library"
import { Flow } from "@styled-icons/fluentui-system-regular/Flow"
import { GraduationCap } from "@styled-icons/fa-solid/GraduationCap"
import { Users } from "@styled-icons/fa-solid/Users"
import { Group2 } from "@styled-icons/remix-fill/Group2"
import { PeopleTeamToolbox } from "@styled-icons/fluentui-system-filled/PeopleTeamToolbox"
import { Identification } from "@styled-icons/heroicons-solid/Identification"
import { Buildings } from "@styled-icons/boxicons-solid/Buildings"
import { Collections } from '@styled-icons/material/Collections'
import { Link } from '@styled-icons/entypo/Link'
const navStructureAdmin = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    urlPath: '/admin',
    icon: 'house-chimney',
    subPages: [],
  },
  {
    name: 'courses',
    title: 'Courses',
    urlPath: '/admin/courses',
    icon: 'graduation-cap',
    capabilities: ['ViewCoursesAdmin'],
    subPages: [
      {
        name: 'courses',
        title: 'All Courses',
        urlPath: '/admin/courses',
        icon: GraduationCap
      },
      {
        name: 'pathways',
        title: 'Pathways',
        urlPath: '/admin/pathways',
        icon: Flow,
        capabilities: ['SeePathways'],
        requireEnabledFeatures: ['pathways']
      },
    ],
  },
  {
    name: 'resources',
    title: 'Resources',
    urlPath: '/admin/resources',
    icon: 'school',
    capabilities: ['UpdateResource', 'ReorderResources'],
    requireEnabledFeatures: ['resources'],
    subPages: [
      {
        name: 'overview',
        title: 'All Resources',
        urlPath: '/admin/resources',
        icon: Library
      },
      {
        name: 'documents',
        title: 'Documents',
        urlPath: '/admin/resources?ctype=document',
        icon: Document,
      },
      {
        name: 'videos',
        title: 'Videos',
        urlPath: '/admin/resources?ctype=video',
        icon: Video,
      },
      {
        name: 'audio',
        title: 'Audio',
        urlPath: '/admin/resources?ctype=audio',
        icon: Speaker2,
      },
      {
        name: 'link',
        title: 'Link',
        urlPath: '/admin/resources?ctype=link',
        icon: Link,
      },
    ],
  },
  {
    name: 'categories',
    title: 'Categories',
    urlPath: '/admin/tags',
    icon: Category,
    capabilities: ['UpdateTag', 'ReorderTags'],
  },
  {
    name: 'collections',
    title: 'Collections',
    urlPath: '/admin/collections',
    icon: Collections,
    capabilities: ['GetCollections'],
    requireEnabledFeatures: ['tags.collections'],
  },
  {
    name: 'users',
    title: 'Users',
    urlPath: '/admin/users',
    icon: 'users',
    subPages: [
      {
        name: 'overview',
        title: 'Users',
        urlPath: '/admin/users',
        icon: Users
      },
      {
        name: 'groups',
        title: 'Groups',
        urlPath: '/admin/users/groups',
        icon: Group2,
        requireEnabledFeatures: ['groups'],
        capabilities: ['CreateGroup'],
      },
      {
        name: 'organisations',
        title: 'Organisations',
        urlPath: '/admin/users/organisations',
        icon: PeopleTeamToolbox,
        requireEnabledFeatures: ['organisations'],
        capabilities: ['CreateGroup'],
      },
      {
        name: 'roles',
        title: 'Roles',
        urlPath: '/admin/users/roles',
        icon: Identification,
        superAdminOnly: true
      },
    ],
  },
  {
    name: 'medialibrary',
    title: 'Media',
    urlPath: '/admin/medialibrary',
    icon: 'photo-video',
    requireEnabledFeatures: ['mediaLibrary'],
    capabilities: ['UpdateMediaItem']
  },
  {
    name: 'reports',
    title: 'Reporting',
    urlPath: '/admin/reports',
    icon: 'chart-line',
  },
  {
    name: 'tenants',
    title: 'Tenants',
    urlPath: '/admin/tenants',
    icon: Buildings,
    superAdminOnly: true,
  },
  {
    name: 'tenant_reports',
    title: 'Tenant Reports',
    urlPath: '/admin/tenant_reports',
    icon: 'chart-line',
    superAdminOnly: true,
  },
]

export default navStructureAdmin
