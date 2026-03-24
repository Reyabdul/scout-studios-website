import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";

export default function Footer() {
  // Get date real-time
  const year = new Date().getFullYear();

  const { data, isLoading, error } = useQuery({
    queryKey: ["footer"],
    queryFn: () =>
      client.fetch(`*[_type == "footer"][0]{ footerText }`),
  });

  if (isLoading) {
    return (
      <footer className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-xs text-black bg-transparent z-30">
        Loading footer...
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-xs text-black bg-transparent z-30">
        Error loading footer.
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-xs text-black bg-transparent z-30">
      © {data?.footerText ?? ''} {year}
    </footer>
  );
}