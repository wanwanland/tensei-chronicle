import { InputTerminal } from "@/components/input/InputTerminal";
import { HeroScene } from "@/components/layout/HeroImage";

export default function Home() {
  return (
    <div className="pb-20">
      {/* Immersive hero — full viewport illustration with parallax */}
      <HeroScene />

      {/* Form floats below the hero */}
      <div className="relative z-30 -mt-24 px-4 md:-mt-16">
        <div className="mx-auto max-w-lg">
          <InputTerminal />
        </div>
      </div>
    </div>
  );
}
