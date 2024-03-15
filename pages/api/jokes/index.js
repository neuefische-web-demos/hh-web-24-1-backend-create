import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();
  console.log("body", request.body);
  if (request.method === "GET") {
    const jokes = await Joke.find();
    return response.status(200).json(jokes);
  }

  if (request.method === "POST") {
    const joke = await Joke.create(request.body);
    console.log("created", joke);
    return response.status(201).json({ message: "Joke created" });
  }
}

// GET PUT POST DELETE

// Wenn ich fetche.. also mit fetch(url) --> GET
// Wir wollen fetchen mit POST method
