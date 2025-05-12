let initialized = false;
let jq: any = null;

export async function runJq(expr: string, input: string = '{}'): Promise<string> {
    if (!initialized) {
        try {
            const module = await import("jq-wasm");
            jq = module.json;
            if (typeof jq !== 'function') {
                return "jq 초기화에 실패했습니다.";
            }
            initialized = true;
        } catch (e: any) {
            return "jq를 초기화하는데 실패했습니다.";
        }
    }

    if (!jq) {
        return "jq가 초기화되지 않았습니다.";
    }

    try {
        const sanitizedExpr = expr.trim();
        const parsedInput = JSON.parse(input);
        const result = await jq(parsedInput, sanitizedExpr);

        if (result.exitCode !== undefined && result.exitCode !== 0) {
            return "jq 표현식에 오류가 있습니다. 문법을 확인해주세요.";
        }

        // 결과가 배열인 경우 JSON 형식으로 변환
        if (Array.isArray(result)) {
            return JSON.stringify(result).replace(/\s+/g, '');
        }

        // 결과가 문자열인 경우 JSON 형식으로 변환
        if (typeof result === 'string') {
            return JSON.stringify(result).replace(/\s+/g, '');
        }

        // 결과가 객체인 경우 JSON 형식으로 변환
        if (typeof result === 'object' && result !== null) {
            return JSON.stringify(result).replace(/\s+/g, '');
        }

        // 그 외의 경우 문자열로 변환하고 공백 제거
        return String(result).replace(/\s+/g, '');
    } catch (e: any) {
        return "jq 실행 중 오류가 발생했습니다. 입력값과 표현식을 확인해주세요.";
    }
}