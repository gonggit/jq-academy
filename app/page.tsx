import GameLayout from "../components/GameLayout";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 배경 교실 일러스트 */}
      <div
        className="absolute inset-0
                   bg-[url('/images/classroom-bg.png')]
                   bg-cover bg-center
                   opacity-30 pointer-events-none"
      />
      {/* 헤더 */}
      <GameLayout />
    </main>
  );
}