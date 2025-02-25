
import AdminPannelLayout from '@/layout/AdminPannelLayout';


export default function AutherLayout({ children }) {
  return (
    <>
      <AdminPannelLayout>
        {children}
      </AdminPannelLayout>
    </>
  );
}
