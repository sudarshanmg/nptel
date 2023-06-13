import { databases } from '@/appwriteConfig';

export async function getCourses() {
  const promise = databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_COURSES_ID
  );

  return promise;
}
