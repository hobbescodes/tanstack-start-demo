import { Footer, Header } from "components/layout";

import type { ReactNode } from "react";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="grid min-h-dvh w-full grid-rows-layout">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
