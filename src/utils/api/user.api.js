const signupApi = async (user) => {
  try {
    const request = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (request.ok) {
      const response = await request.json();
      console.log(response);
      return true;
    } else {
      throw err;
    }
  } catch (err) {
    alert("Occured error from signupApi.");
    console.error(err);
    return false;
  }
};
export { signupApi };
