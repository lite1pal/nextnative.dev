export default function RatingSvg() {
  return (
    <img
      src="/stars.svg"
      width={109}
      height={25}
      alt="5 out of 5 stars"
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      style={{ display: "inline-block" }}
    />
  );
}
