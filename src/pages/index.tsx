import AllPhotos from "components/AllPhotos";
import { DropzoneButton } from "components/DropzoneButton";
import AppScheme from "layouts/AppScheme";

export default function IndexPage() {
  return (
    <div>
      <AppScheme>
        <DropzoneButton />

        <AllPhotos />
      </AppScheme>
    </div>
  );
}
