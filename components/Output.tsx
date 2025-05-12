"use client"

import React, { useEffect, useState } from "react";
import confetti from 'canvas-confetti';

type Props = {
    expected: string;
    actual: any;
    onCorrect?: () => void;
};

export default function Output({ expected, actual, onCorrect }: Props) {
    const [isCorrect, setIsCorrect] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        const newIsCorrect = actual === expected;

        if (newIsCorrect && !isCorrect) {
            setIsCorrect(true);
            setShowCelebration(true);

            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });

                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            setTimeout(() => {
                setShowCelebration(false);
                if (onCorrect) {
                    onCorrect();
                }
            }, 3000);
        }

        if (!newIsCorrect && isCorrect) {
            setIsCorrect(false);
        }
    }, [actual, expected, isCorrect, onCorrect]);

    return (
        <div className="relative">
            <pre className="bg-gray-400 rounded p-2 h-48 overflow-auto">
                {actual || expected}
            </pre>
            <div className="mt-2 text-center">
                {isCorrect ? (
                    <span className="text-green-600 font-bold">✅ 정답!</span>
                ) : (
                    <span className="text-red-600 font-bold">❌ 오답</span>
                )}
            </div>
        </div>
    );
}