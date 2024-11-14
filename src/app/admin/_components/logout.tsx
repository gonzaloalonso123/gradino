import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";

export default () => {
  const router = useRouter();
  return (
    <Button
      className="w-full lg:w-1/3 mt-10"
      onClick={() => {
        auth.signOut();
        router.push("/login");
      }}
    >
      Logout
    </Button>
  );
};
