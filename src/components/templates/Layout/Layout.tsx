import { Footer, Header } from '@/components/organisms';
import React, { ReactNode } from 'react'
// import { ConfirmModal } from 'components/molecules';

interface LayOutProps {
  children: ReactNode;
}

function Layout({ children }: LayOutProps) {
  // const location = useLocation(); 
  // const checkCurrentPathIsMain = location.pathname === '/';
  // const confirmModal = useSelector((state: RootState) => state.confirmModal);

  return (
    <div>
      <Header />
      {/* <main className={checkCurrentPathIsMain ? 'home' : ''}>
        {children}
      </main>
      {checkCurrentPathIsMain || <Footer />} */}
      {/* {confirmModal.active && <ConfirmModal />} */}
    </div>
  )
}

export default Layout;