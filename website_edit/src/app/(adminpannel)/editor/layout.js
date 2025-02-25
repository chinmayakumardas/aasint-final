
import AdminPannelLayout from '@/layout/AdminPannelLayout';


export default function EditorLayout({ children }) {
  return (
    <>
      <AdminPannelLayout>
        {children}
      </AdminPannelLayout>
    </>
  );
}
