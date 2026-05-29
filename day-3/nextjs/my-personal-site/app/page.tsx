import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello, I am Niket</h1>
      <p>Welcome to my personal site.</p>
      <p>I am a Computer Science student, problem solver, and full stack developer.</p>
      <p>
        Learn more <Link href="/about">about me</Link> or check out my{" "}
        <Link href="/projects">projects</Link>.
      </p>
    </div>
  );
}