import Link from "next/link";
import Menu1 from "./Menu-1";
import SearchBar from "./SearchBar";

export default function Header({children}) {
  return (
    <div className="w-full bg-blue-dark">
      <header className="mx-auto max-w-screen-xl p-8 items-center text-white flex">
        <Link href="/">
          <a>
            <img src="/logo-main.png" className="w-40"/>
          </a>
        </Link>
        <Menu1 />
        <SearchBar />
      {children}
      </header>
    </div>
  )
}