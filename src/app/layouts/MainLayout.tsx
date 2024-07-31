'use client'

import { Footer, Header } from '@/components';
import { ThemeStateProvider } from '@/context/ThemeStateContext';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    //redux용
  <>
    {/* // <ThemeStateProvider>
    //   <Header /> */}
      {children}
    {/* //   <Footer />
    // </ThemeStateProvider> */}
  </>
  )
}

export { MainLayout };