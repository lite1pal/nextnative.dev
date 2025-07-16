async function LovedByMakers() {
  let customersCount = 20;
  let isError = false;

  try {
    const res = await fetch(`${process.env.API_URL}/customers-count`, {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch customers count");
    }
    const data = await res.json();
    customersCount = data.count || 20;
  } catch (error) {
    console.error("Error calculating discount limit:", error);
    isError = true;
  }
  return (
    <div className="font-medium text-gray-500 pl-2">
      Loved by <span className="text-foreground">{customersCount}</span> makers
    </div>
  );
}

export default LovedByMakers;
