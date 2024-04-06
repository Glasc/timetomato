export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()

  if (!session) {
    throw new Error("Session not found")
  }

  const userId = session.user.userId

  try {
    await db.execute({
      sql: `DELETE FROM timers WHERE user_id = ?`,
      args: [userId],
    })
    await auth.deleteUser(userId)
    console.log("User deleted successfully")
    return sendRedirect(event, "/"); // redirect to app local version
  } catch (err) {
    console.log("Error deleting the user:")
    console.log(err)
  }
})
