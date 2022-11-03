import Link from "next/link";
import Menu1 from "./Menu-1";
export default function Footer({children}) {
  return (
    <div className="w-full bg-main-secondary">
      <footer className="mx-auto max-w-screen-lg p-8 items-center text-white flex">
        <Link href="/">

          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logo-main.png`} className="w-40"/>

        </Link>
        <Menu1 />
      {children}
      </footer>
    </div>
  );
}
