import { db } from "../utils/lucia";
import { timerConfigSchemaMs } from "~/utils";
import convertResponseToTimerConfig from "~/shared/data-adapter";

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();

  if (!session) {
    throw new Error("Session not found");
  }

  const userId = session.user.userId;

  const rawTimerConfig = await db.execute(
    `SELECT * FROM timers WHERE user_id="${userId}" LIMIT 1`
  );

  const timerConfig = convertResponseToTimerConfig(rawTimerConfig)[0];

  return timerConfigSchemaMs.parse({
    pomodoro: timerConfig.pomodoro,
    shortBreak: timerConfig.short_break,
    longBreak: timerConfig.long_break,
  });
});
