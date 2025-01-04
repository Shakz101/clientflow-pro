import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://www.devircle.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Devircle
            </a>
            . All rights reserved.
          </p>
        </div>
        <nav className="flex items-center">
          <Link
            to="/privacy-policy"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}