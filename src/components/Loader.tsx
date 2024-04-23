import "../styles/loader.css";

interface LoaderPropTypes {
  color?: string;
  background?: string;
  size?: number;
  speed_second?: number;
  className?: string;
}

export default function Loader({
  color = "#3498db",
  background = "#f3f3f3",
  size = 20,
  speed_second = 0.9,
  className,
}: LoaderPropTypes) {
  return (
    <>
      <div
        className={`loader ${className}`}
        style={{
          border: `${size / 7}px solid ${background}`,
          borderRadius: "50%",
          borderTop: `${size / 7}px solid ${color}`,
          width: size,
          height: size,
          WebkitAnimation: `spin ${speed_second}s linear infinite`,
          animation: `spin ${speed_second}s linear infinite`,
        }}
      ></div>
    </>
  );
}
