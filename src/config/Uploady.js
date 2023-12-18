import { supabase } from "@/config/Supbase";

const SupabaseUpload = (uploader) => {
  uploader.update({
    send: async (file, url, options, onProgress) => {
      const originalFileName = file.name.split(".").shift().slice(0, 10);
      const fileExt = file.name.split(".").pop().toLowerCase();
      const fileName = `${Date.now()}_${originalFileName}.${fileExt}`;
      const filePath = `${process.env.NEXT_SUPABASE_AVATARS_PATH}/${fileName}`;

      const { error } = await supabase.storage
        .from("user-avatars")
        .upload(filePath, file, {
          onUploadProgress: (progress) => {
            const percent = Math.round(
              (progress.loaded / progress.total) * 100
            );
            onProgress(percent);
          },
        });

      if (error) {
        throw error;
      }

      return {
        success: true,
        fileUrl: `user-avatars/${filePath}`,
      };
    },
  });

  return uploader;
};
