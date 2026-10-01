/** Shared hero banner used by every interior page. */
export default function PageBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="page-banner">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p className="mt-2 text-sm opacity-90">{subtitle}</p>}
      </div>
    </section>
  );
}
