import { getHealth } from "@/api/handlers";

export async function GET() {
  return Response.json(getHealth());
}
