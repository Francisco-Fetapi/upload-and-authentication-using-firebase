import { DropzoneButton } from "components/DropzoneButton";
import AppScheme from "layouts/AppScheme";

export default function IndexPage() {
  return (
    <div>
      <AppScheme>
        <h1>Bem-Vindo!</h1>

        <DropzoneButton />
      </AppScheme>
    </div>
  );
}
