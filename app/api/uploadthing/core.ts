import { auth } from '@/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { db } from '../../../lib/db';
import { getUserByEmail } from '../../../lib/utils/getUser';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: { maxFileSize: '4MB' },
    pdf: { maxFileSize: '8MB' },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const session = await auth();
      console.log('🚀 ~ .middleware ~ session:', session);
      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError('Unauthorized');
      if (!session.user) throw new UploadThingError('Unauthorized');
      if (!session.user.email) throw new UploadThingError('Unauthorized');
      const user = await getUserByEmail(session.user.email!);
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userEmail: session.user.email, userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const uploadedFileOnDB = await db.uploadedFiles.create({
        data: {
          userId: metadata.userId!,
          email: metadata.userEmail!,
          url: file.url,
          fileType: file.type,
          fileName: file.name,
          fileSize: file.size,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedFileOnDB: JSON.stringify(uploadedFileOnDB) };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
