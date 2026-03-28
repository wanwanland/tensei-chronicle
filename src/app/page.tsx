import { InputTerminal } from "@/components/input/InputTerminal";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-4 pb-20">
      <div className="w-full max-w-lg">
        <p className="mb-8 text-center font-mono text-sm text-white/40">
          もしも別の時代に生まれていたら——
          <br />
          あなたのIFの人生をシミュレーション
        </p>
        <InputTerminal />
      </div>
    </div>
  );
}
