import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";



const Header = ({children,className}:HeaderProps) => {
  return (
    <div className={cn("min-h-[92px] min-w-full flex-nowrap bg-dark-100 flex w-full items-center justify-between gap-2 px-4 border-b border-dark-300",className)}>
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo with name"
          width={120}
          height={32}
          className="max-md:hidden"
          priority
        />

      </Link>
      {children}
    </div>
  );
};

export default Header;
