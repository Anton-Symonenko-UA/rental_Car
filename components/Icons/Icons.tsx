interface IconProps {
  name: "check-circle" | "location";
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
