import JokeList from "../components/JokeList";
import useSWR from "swr";

export default function HomePage() {
  const { mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    console.log(jokeData);

    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jokeData),
    });

    if (response.ok) {
      mutate();
    }

    event.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="joke-input">Enter a new joke</label>
        <input type="text" id="joke-input" name="joke" />
        <button type="submit">Submit</button>
      </form>
      <JokeList />
    </>
  );
}
