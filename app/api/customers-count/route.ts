import { prisma } from "@/prisma/client";

export async function GET() {
  // Simulate a database call
  const customersCount = await prisma.globalNumber.findUnique({
    where: {
      id: "99c3a4be-4565-451b-813e-82bf381568d7",
      title: "customers",
    },
  });

  if (!customersCount) {
    return new Response(JSON.stringify({ count: 0 }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  return new Response(JSON.stringify({ count: customersCount.value }), {
    headers: { "Content-Type": "application/json" },
  });
}
