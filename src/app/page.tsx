import Main from "@/components/main";
import { authOptions } from "@/lib/Auth";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1>Você não está logado.</h1>
        <a href="/login">Ir para login</a>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center ">
      <Main />
    </div>
  );
}
