import Link from "next/link";
import React from "react";

interface LogoProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

const EGLogo: React.FC<LogoProps> = ({
  href = "/",
  className = "text-xl font-bold text-gray-800",
  children = "Expense Genius Logo",
}) => {
  // TODO: Import actual logo
  return (
    <div className="flex items-center">
      <Link href={href}>
        <span className={className}>{children}</span>
      </Link>
    </div>
  );
};

export default EGLogo;
