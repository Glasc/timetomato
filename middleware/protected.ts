export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  console.log("user: ")
	console.log(user.value)
  if (!user.value) return navigateTo("/login");
});
