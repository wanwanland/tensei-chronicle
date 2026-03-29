import Link from "next/link";

export function Header() {
  return (
    <header className="relative z-10 flex items-center justify-center py-8" role="banner">
      <Link href="/" aria-label="転生年表 トップページへ">
        <h1
          className="glitch-text font-mono text-3xl font-bold tracking-wider text-white md:text-4xl"
          data-text="転生年表"
        >
          転生年表
        </h1>
      </Link>
      <span className="ml-4 font-mono text-xs uppercase tracking-widest text-neon-cyan/60" aria-hidden="true">
        Tensei Chronicle
      </span>
    </header>
  );
}
