import { json } from "@remix-run/node";

export const loader = async () => {
  return json({ message: "from wishlist" });
};

export const action = async ({ request }) => {
  const reqInfo = request.method;

  switch (reqInfo) {
    case "POST":
      return json("POST request triggered");
    case "PUT":
      return json("PUT request triggered");
    default:
      return new Response("invalid request");
  }

};
