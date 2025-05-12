'use client';

import React, { useState } from "react";

type Mood = "neutral" | "happy" | "sad" | "thinking";

type Props = {
    mood: Mood;
    message: string;
    jsonData: string;
    description: string;
    answer: string;
    knowledge: {
        title: string;
        items: string[];
        references: { title: string; url: string }[];
    };
    currentStage: number;
    totalStages: number;
    onStageChange: (stage: number) => void;
    maxCompletedStage: number;
};

export default function MagicInstructor({
    mood,
    message,
    jsonData,
    description,
    answer,
    knowledge,
    currentStage,
    totalStages,
    onStageChange,
    maxCompletedStage
}: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isCorrect, setIsCorrect] = useState(false);
    const problemsPerPage = 5;
    const totalPages = Math.ceil(totalStages / problemsPerPage);

    const handleNextProblem = () => {
        if (currentStage < totalStages) {
            onStageChange(currentStage + 1);
        }
    }

    const checkAnswer = (userAnswer: string) => {
        setIsCorrect(userAnswer == answer);
    }
    const startIndex = (currentPage - 1) * problemsPerPage;
    const endIndex = Math.min(startIndex + problemsPerPage, totalStages);
    const currentProblems = Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i);

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex flex-col p-4 flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl">🧙‍♀️</div>
                </div>

                {/* jq 기본 지식 */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">{knowledge.title}</h3>
                    <div className="text-sm text-gray-700 space-y-2">
                        {knowledge.items.map((item, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                    </div>
                </div>

                {/* Display the answer at the end of hints */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">정답</h3>
                    <p className="text-gray-800">{answer}</p>
                </div>

                {/* 문제 설명 */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">문제</h3>
                    <p className="text-gray-800">{description}</p>
                </div>

                {/* 입력 데이터 */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">입력 데이터</h3>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-48 text-sm text-gray-800">
                        {jsonData}
                    </pre>
                </div>

                {/* 예상 출력 */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">예상 출력</h3>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm text-gray-800">
                        {answer}
                    </pre>
                </div>

                {/* 참고 문서 */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">참고 문서</h3>
                    <ul className="list-disc pl-6 text-sm text-blue-600">
                        {knowledge.references.map((ref, index) => (
                            <li key={index}>
                                <a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 문제 버튼 */}
            <div id="buttons" className="mt-4 pb-4 flex justify-center">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                    >
                        이전
                    </button>
                    {currentProblems.map((stage) => {
                        const isDisabled = stage > maxCompletedStage + 1;
                        return (
                            <button
                                key={stage}
                                onClick={() => !isDisabled && onStageChange(stage)}
                                className={`px-3 py-1 rounded ${stage === currentStage
                                    ? "bg-blue-500 text-white"
                                    : isDisabled
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {stage + 1}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
}