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

      </Link>
      {children}
    </div>
  );
};

export default Header;
