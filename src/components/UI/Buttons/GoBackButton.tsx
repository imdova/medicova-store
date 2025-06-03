import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GoBackButton = () => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanGoBack(window.history.length > 2);
    }
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <button
      onClick={handleGoBack}
      aria-label={
        canGoBack ? "Go back to previous page" : "Return to home page"
      }
      className={`inline-flex items-center rounded-md px-2 py-2 text-xs font-semibold transition-all duration-200 focus:outline-none md:px-3 ${
        canGoBack
          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      <ArrowLeft size={15} className="md:mr-2" />
      <span className="hidden text-xs md:block">
        {canGoBack ? "Go Back" : "Home"}
      </span>
    </button>
  );
};

export default GoBackButton;
