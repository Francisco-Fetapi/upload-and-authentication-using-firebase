import { openConfirmModal } from "@mantine/modals";
import { apiRoutes } from "lib/axios";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useQueryClient } from "react-query";

export default function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  function handle() {
    openConfirmModal({
      title: "Terminar Sessão",
      children: "Tem certeza que quer terminar sessão?",
      labels: { confirm: "Sim", cancel: "Não" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        apiRoutes.get("/logout");
        logout();
      },
    });
  }

  function logout() {
    destroyCookie(null, "uid");
    apiRoutes.defaults.headers["uid"] = null;
    router.push("/iniciar-sessao");
    queryClient.clear();
  }

  return { handle };
}
