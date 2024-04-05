import { db } from "../utils/lucia";
import { timerConfigSchemaMs } from "~/utils";
import convertResponseToTimerConfig from "~/shared/data-adapter";
import { z } from "zod";
import { ResultSet } from "@libsql/client";

const getUserId = (id: string | undefined) => {
  const userId = z.string().min(1).safeParse(id);
  if (!userId.success) {
    throw new Error("");
  }
  return userId.data;
};

const getBody = (requestBody: Awaited<ReturnType<typeof readBody>>) => {
  const body = timerConfigSchemaMs.safeParse(requestBody);
  if (!body.success) {
    throw new Error("");
  }
  return body.data;
};

export default defineEventHandler(async (event) => {
  let userId: string | undefined;
  try {
    const authRequest = auth.handleRequest(event);
    const session = await authRequest.validate();

    if (!session) {
      throw new Error("Session not found");
    }

    userId = getUserId(session.user.userId);
  } catch (err) {
    console.log("Error handling auth request:", err);
    return;
  }

  let pomodoro: number;
  let shortBreak: number;
  let longBreak: number;

  try {
    const body = getBody(await readBody(event));
    pomodoro = body.pomodoro;
    shortBreak = body.shortBreak;
    longBreak = body.longBreak;
  } catch (err) {
    console.log("Error parsing request body:", err);
    return;
  }

  let rawTimerConfig: ResultSet | undefined;

  try {
    rawTimerConfig = await db.execute({
      sql: `UPDATE timers
      SET pomodoro = ?, short_break = ?, long_break = ?
      WHERE user_id = ?`,
      args: [pomodoro, shortBreak, longBreak, userId]
    });
  } catch (err) {
    console.log("Error executing database query:", err);
    return;
  }

  return convertResponseToTimerConfig(rawTimerConfig);
});
