import { User } from "../graphql/generated";

export function getUserEditUrl(user: User) {
  return `/admin/users/edit?id=${user.id}`
}