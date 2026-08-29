import Image from "next/image";

type IconProps = {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
};

export function Icon({ src, alt = "", size = 28, className }: IconProps) {
  return (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={size}
      height={size}
      aria-hidden={alt ? undefined : true}
    />
  );
}
