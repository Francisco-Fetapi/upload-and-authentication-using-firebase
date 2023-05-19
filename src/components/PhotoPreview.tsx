import { useEffect, useState } from "react";
import CardImage, { Picture } from "./CardImage";

interface PhotoPreviewProps {
  file: File;
  title: string;
}

export default function PhotoPreview({ title, file }: PhotoPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, []);
  return (
    <div
      style={{
        maxWidth: "400px",
        height: "300px",
        margin: "0 auto",
      }}
    >
      {previewUrl && (
        <CardImage
          picture={{
            date: new Date().toString(),
            title,
            image: previewUrl as string,
          }}
        />
      )}
    </div>
  );
}
