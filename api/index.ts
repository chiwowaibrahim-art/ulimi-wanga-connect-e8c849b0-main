import server from "../src/server";

export const config = {
  runtime: "nodejs18",
};

export default async function handler(request: Request) {
  return server.fetch(request, undefined, undefined);
}
