export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-6 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          GitHub Profile Pet
        </h1>
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG is generated dynamically by the API route */}
        <img src="/api/pet" alt="GitHub commit streak pet" width={330} height={330} />
        <p className="max-w-md text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Embed this in your README with:
        </p>
        <code className="rounded bg-black/[.06] px-3 py-2 font-mono text-sm dark:bg-white/[.08]">
          {"![pet](https://your-deployment-url.com/api/pet)"}
        </code>
      </main>
    </div>
  );
}
