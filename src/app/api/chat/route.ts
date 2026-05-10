import { handleChat } from "@/api/handlers";

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "bad_json", message: "El body tiene que ser JSON válido." },
      { status: 400 },
    );
  }

  const result = await handleChat(input);
  return Response.json(result.body, { status: result.status });
}
