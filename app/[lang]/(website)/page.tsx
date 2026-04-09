import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <Hero />
      <main className="flex flex-1 flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        <p>Placeholder</p>
      </main>
    </div>
  );
}
