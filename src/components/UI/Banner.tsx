import Image from "next/image";
import Link from "next/link";
type BannerProps = {
  image: string;
  url: string;
};

export const Banner: React.FC<BannerProps> = ({ image, url }) => {
  return (
    <Link href={url} className="relative block w-full md:h-[80px] lg:h-[140px]">
      <Image
        className="h-full w-full rounded-md object-cover md:rounded-xl"
        src={image}
        width={800}
        height={800}
        alt="Banner Ad"
      />
      <span className="absolute bottom-0 right-0 rounded-lg bg-white/75 px-2 py-1 text-[8px] text-gray-500 md:text-xs">
        Ad
      </span>
    </Link>
  );
};
