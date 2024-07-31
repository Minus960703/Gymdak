import { ImageUploader } from '@/components';
import { MainLayout } from './layouts/MainLayout';

export default function Home() {
  // console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return (
    <main>
      <MainLayout>
        <ImageUploader />
      </MainLayout>
    </main>
  );
}
