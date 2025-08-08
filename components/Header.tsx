import Image from "next/image";
import Link from "next/link";



const Header = ({children}:HeaderProps) => {
  return (
    <div className="header">
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo with name"
          width={120}
          height={32}
          className="max-md:hidden"
        />
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="max-md:hidden mr-2"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
