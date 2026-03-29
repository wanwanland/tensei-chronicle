import { InputTerminal } from "@/components/input/InputTerminal";
import { HeroScene } from "@/components/layout/HeroImage";

export default function Home() {
  return (
    <div className="pb-20">
      <HeroScene />

      {/* Form — seamlessly follows the hero's fade-to-black */}
      <div className="relative z-20 mt-6 px-4 md:mt-8">
        <div className="mx-auto max-w-lg">
          <InputTerminal />
        </div>
      </div>
    </div>
  );
}
