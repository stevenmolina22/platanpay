import { resetSession } from "@/api/handlers";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return Response.json(await resetSession(id));
}
