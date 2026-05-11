import Hero from "@/app/components/hero/Hero";
import Timeline from "@/app/components/timeline/Timeline";
import PlaygroundPreview from "@/app/components/playground-preview/PlaygroundPreview";

export default function Home() {
  return (
    <main>
      <Hero />
      <Timeline />
      <PlaygroundPreview />
    </main>
  );
}
