import { showNotification } from "@mantine/notifications";
import { apiRoutes } from "lib/axios";
import { HandleUploadApiResponse } from "pages/api/upload";
import { useMutation, useQueryClient } from "react-query";

interface FileInfo {
  file: File;
  title: string;
}

interface UseDeleteHandleProps {
  url: `/${string}`;
  queryToRefetch: string;
  documents: Document[];
}

export default function useUpload() {
  const handleUpload = useMutation(({ file, title }: FileInfo) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    return apiRoutes.post<HandleUploadApiResponse>("/upload", formData);
  });

  // handleDelete.mutate(documents_ || documents, {
  //   onSuccess(res, variables, context) {
  //     showNotification({
  //       title: "Imagem carregada.",
  //       message: "",
  //       color: "green",
  //     });
  //     queryClient.refetchQueries([queryToRefetch]);
  //   },
  // });

  return { handleUpload };
}
