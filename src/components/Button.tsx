import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";

type Shared = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = Shared & {
  href: string;
  type?: never;
};

export function Button({
  children,
  variant = "primary",
  className,
  href,
  ...rest
}: ButtonAsButton | ButtonAsLink) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
