import { count, eq } from "drizzle-orm";
import type { AgentMessage } from "@/lib/agent";
import { db } from "@/db";
import { sessions } from "@/db/schema";

export async function getSessionMessages(sessionId: string): Promise<AgentMessage[]> {
  const row = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
    columns: { messages: true },
  });

  return row?.messages ?? [];
}

export async function saveSessionMessages(sessionId: string, messages: AgentMessage[]) {
  await db
    .insert(sessions)
    .values({ id: sessionId, messages, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: sessions.id,
      set: { messages, updatedAt: new Date() },
    });
}

export async function deleteSession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function countSessions() {
  const [row] = await db.select({ value: count() }).from(sessions);
  return row?.value ?? 0;
}
