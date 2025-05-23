import Link from "next/link";
import Menu1 from "../../Menu-1";
import SearchBar from "../../SearchBar";

export default function Header({children}) {

  return (
    <div className="w-full bg-white">
      <header className="mx-auto max-w-screen-xl p-1 items-center text-main-secondary flex">
        <Link href="/">

          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logo-main.png`} className="w-40"/>

        </Link>
        <Menu1 />
        <SearchBar />
      {children}
      </header>
    </div>
  );
}
