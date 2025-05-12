"use client"

import React, { useEffect, useState } from "react";
import { runJq } from "../lib/jq-runner";
import debounce from "lodash/debounce";

type Props = {
    initial: string;
    onOutputChange: (output: string) => void;
    jsonData: string;
    hints: string[];
    isCompleted?: boolean;
    answer?: string;
    onCorrect?: () => void;
    resetHintIndex: () => void;
};

export default function Editor({ initial, onOutputChange, jsonData, hints, isCompleted, answer, onCorrect, resetHintIndex }: Props) {
    const [expr, setExpr] = useState(initial);
    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const [lastInputTime, setLastInputTime] = useState(Date.now());
    const [showCelebration, setShowCelebration] = useState(false);

    // Update input and reset hint index when the problem changes
    useEffect(() => {
        setCurrentHintIndex(0);
        resetHintIndex();
    }, [resetHintIndex]);

    // Check answer and trigger celebration
    const checkAnswer = (val: string) => {
        const cleanExpr = val.replace(/['"]/g, '').trim();
        runJq(cleanExpr, jsonData).then((res) => {
            onOutputChange(res);
            if (res === answer) {
                setShowCelebration(true);
                if (onCorrect) {
                    onCorrect();
                }
                setTimeout(() => setShowCelebration(false), 3000);
            } else {
                setShowCelebration(false);
            }
        });
    };

    const debouncedCheck = debounce(checkAnswer, 200);

    useEffect(() => {
        debouncedCheck(expr);
        setLastInputTime(Date.now());
    }, [expr]);

    // Update hints every 10 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            const timeSinceLastInput = Date.now() - lastInputTime;
            if (timeSinceLastInput >= 10000 && currentHintIndex < hints.length - 1) {
                setCurrentHintIndex(prev => prev + 1);
            }
        }, 10000);

        return () => clearInterval(timer);
    }, [lastInputTime, currentHintIndex, hints.length]);

    return (
        <div>
            <textarea
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                className="w-full h-48 font-mono p-2 border border-gray-300 rounded"
            />
            <div className="mt-2">
                <span className="text-sm text-white">힌트: </span>
                <span className="text-sm text-white select-all">{hints[currentHintIndex]}</span>
            </div>

            {showCelebration && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="text-4xl font-bold text-blue-600 animate-bounce">
                        맞았습니다! 🎉
                    </div>
                </div>
            )}
        </div>
    );
}