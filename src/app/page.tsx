import { InputTerminal } from "@/components/input/InputTerminal";
import { HeroImage } from "@/components/layout/HeroImage";

export default function Home() {
  return (
    <div className="px-4 pb-20 pt-4">
      <div className="mx-auto w-full max-w-3xl">
        <HeroImage />

        <div className="mx-auto max-w-lg">
          <p className="mb-8 text-center font-mono text-sm text-white/50">
            もしも別の時代に生まれていたら——
            <br />
            あなたのIFの人生をシミュレーション
          </p>
          <InputTerminal />
        </div>
      </div>
    </div>
  );
}
