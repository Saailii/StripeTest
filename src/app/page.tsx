import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const session = auth();
  console.log(session);

  return <div></div>;
}
