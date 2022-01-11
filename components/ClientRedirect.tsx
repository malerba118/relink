import { useRouter } from "next/router";
import { useEffect } from "react";

interface ClientRedirectProps {
  href: string;
}

export const ClientRedirect: React.FC<ClientRedirectProps> = ({ href }) => {
  const router = useRouter();
  useEffect(() => {
    if (href) {
      router.push(href);
    }
  }, [href]);
  return null;
};

export default ClientRedirect;
