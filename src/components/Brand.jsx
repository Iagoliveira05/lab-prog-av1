import { Link } from "react-router";
export default function Brand({ to = "/", light = false }) {
  return (
    <Link
      className={`brand ${light ? "brand-light" : ""}`}
      to={to}
      aria-label="Fluxo — início"
    >
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      fluxo<span className="brand-period">.</span>
    </Link>
  );
}
