'use client';

import { useEffect, useState } from "react";
import MagicInstructor from "./MagicInstructor";
import Editor from "./Editor";
import Output from "./Output";
import stages from "../data/stages";

export default function GameLayout() {
    const [lastStage, setLastStage] = useState(0);
    const [jqOutput, setJqOutput] = useState<any>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [completedStages, setCompletedStages] = useState<number[]>([]);
    const [stageAnswers, setStageAnswers] = useState<Record<number, string>>({});
    const [stageInputs, setStageInputs] = useState<Record<number, string>>({});
    const [currentHintIndex, setCurrentHintIndex] = useState(0);

    useEffect(() => {
        const savedStage = Number(localStorage.getItem("lastStage") ?? 0);
        const savedCompleted = JSON.parse(localStorage.getItem("completedStages") ?? "[]");
        const savedAnswers = JSON.parse(localStorage.getItem("stageAnswers") ?? "{}");
        const savedInputs = JSON.parse(localStorage.getItem("stageInputs") ?? "{}");
        setLastStage(savedStage);
        setCompletedStages(savedCompleted);
        setStageAnswers(savedAnswers);
        setStageInputs(savedInputs);
    }, []);

    const current = stages[lastStage];

    const handleCorrectAnswer = () => {
        // 현재 스테이지를 완료 목록에 추가하고 정답 저장
        if (!completedStages.includes(lastStage)) {
            const newCompleted = [...completedStages, lastStage];
            const newAnswers = { ...stageAnswers, [lastStage]: jqOutput };
            setCompletedStages(newCompleted);
            setStageAnswers(newAnswers);
            localStorage.setItem("completedStages", JSON.stringify(newCompleted));
            localStorage.setItem("stageAnswers", JSON.stringify(newAnswers));
        }

        if (lastStage < stages.length - 1) {
            // 다음 스테이지로 진행
            const nextStage = lastStage + 1;
            setLastStage(nextStage);
            setJqOutput(null);
            localStorage.setItem("lastStage", nextStage.toString());
        } else {
            // 모든 스테이지 완료
            setIsCompleted(true);
        }
    };

    const resetHintIndex = () => {
        setCurrentHintIndex(0);
    };

    const handleStageChange = (stage: number) => {
        setLastStage(stage);
        setJqOutput(null);
        resetHintIndex();
    };

    const handleInputChange = (input: string) => {
        setJqOutput(input);
        setStageInputs(prev => {
            const newInputs = { ...prev, [lastStage]: input };
            localStorage.setItem("stageInputs", JSON.stringify(newInputs));
            return newInputs;
        });
    };

    const resetProgress = () => {
        localStorage.setItem("lastStage", "0");
        localStorage.setItem("completedStages", "[]");
        localStorage.setItem("stageAnswers", "{}");
        localStorage.setItem("stageInputs", "{}");
        setLastStage(0);
        setJqOutput(null);
        setIsCompleted(false);
        setCompletedStages([]);
        setStageAnswers({});
        setStageInputs({});
    };

    if (isCompleted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">🎉 축하합니다! 🎉</h2>
                    <p className="text-xl mb-6">모든 jq 문제를 해결하셨습니다!</p>
                    <button
                        onClick={resetProgress}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        처음부터 다시 시작하기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="relative z-10 max-w-6xl w-full mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[850px]">
                    {/* 왼쪽: 교관 + 말풍선 (2칸 높이) */}
                    <section className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg md:row-span-2 h-full">
                        <MagicInstructor
                            mood="neutral"
                            message={current.hints[0]}
                            jsonData={current.jsonData}
                            description={current.description}
                            answer={current.answer}
                            knowledge={current.knowledge}
                            currentStage={lastStage}
                            totalStages={stages.length}
                            onStageChange={handleStageChange}
                            maxCompletedStage={Math.max(...completedStages, -1)}
                        />
                    </section>

                    {/* 오른쪽 위: jq 입력창 */}
                    <section className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg h-full overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-2">JQ 입력</h2>
                        <Editor
                            initial={current.template}
                            onOutputChange={handleInputChange}
                            jsonData={current.jsonData}
                            hints={current.hints}
                            isCompleted={completedStages.includes(lastStage)}
                            answer={current.answer || ""}
                            resetHintIndex={resetHintIndex}
                        />
                    </section>

                    {/* 오른쪽 아래: 출력 + 정답 확인 */}
                    <section className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg h-full overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-2">결과</h2>
                        <Output
                            expected={current.answer}
                            actual={jqOutput}
                            onCorrect={handleCorrectAnswer}
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}