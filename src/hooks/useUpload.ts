import { showNotification } from "@mantine/notifications";
import { apiRoutes } from "lib/axios";
import { HandleUploadApiResponse } from "pages/api/upload";
import { useMutation, useQueryClient } from "react-query";

interface FileInfo {
  file: File;
  // file: string;
  title: string;
}

export default function useUpload() {
  const handleUpload = useMutation(async ({ file, title }: FileInfo) => {
    // return apiRoutes.post<HandleUploadApiResponse>("/upload", {
    //   file,
    //   title,
    // });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    return apiRoutes.post<HandleUploadApiResponse>("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

  //     queryClient.refetchQueries([queryToRefetch]);

  return { handleUpload };
}
