export default function getJWT() {
  return localStorage.getItem('actAsToken') || localStorage.getItem('token')
}