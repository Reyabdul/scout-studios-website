import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";
import { useEffect, useState } from "react";

function useFooterTextColor(sectionIds = ["mission", "marquee", "contact"]) {
  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    function onScroll() {
      let found = false;

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        const rect = section.getBoundingClientRect();

        // Section is at least partially in the viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          found = true;
          break;
        }
      }

      setIsWhite(found);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Check on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return isWhite;
}

export default function Footer() {
  // Get date real-time
  const year = new Date().getFullYear();

  const { data, isLoading, error } = useQuery({
    queryKey: ["footer"],
    queryFn: () =>
      client.fetch(`*[_type == "footer"][0]{ footerText }`),
  });

  // Custom hook to determine if footer text should be white
  const isWhite = useFooterTextColor(["mission", "marquee", "contact"]);

  if (isLoading) {
    return (
      <footer className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-xs text-black bg-transparent z-30">
        <span className={isWhite ? "text-white" : "text-black"}>
          Loading footer...
        </span>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-xs text-black bg-transparent z-30">
        <span className={isWhite ? "text-white" : "text-black"}>
          Error loading footer.
        </span>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-xs text-black bg-transparent z-30">
      <span className={isWhite ? "text-white" : "text-black"}>
        © {data?.footerText ?? ""} {year}
      </span>
    </footer>
  );
}