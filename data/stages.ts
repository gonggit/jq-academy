type Reference = {
    title: string;
    url: string;
};

type Stage = {
    id: number;
    title: string;
    description: string;
    jsonData: string;
    template: string;
    hints: string[];
    knowledge: {
        title: string;
        items: string[];
        references: Reference[];
    };
    answer: string;
};

export const stages: Stage[] = [
    {
        id: 0,
        title: "기본 필터링",
        description: "입력 데이터에서 name 필드의 값만 추출하세요.",
        jsonData: JSON.stringify({
            name: "Alice",
            age: 30,
            city: "Seoul"
        }),
        template: "",
        hints: [
            "name 필드의 값을 가져오려면 .name을 사용하세요.",
            "jq에서 .은 현재 객체를 의미합니다.",
            "필드에 접근할 때는 .필드명 형식을 사용합니다.",
            "jq 명령어: `.name`"
        ],
        knowledge: {
            title: "기본 필터링",
            items: [
                "jq에서 객체의 특정 필드에 접근하려면 .필드명을 사용합니다.",
                "예를 들어 .name은 name 필드의 값을 가져옵니다."
            ],
            references: [
                { title: "jq 공식 문서 - 필드 접근", url: "https://stedolan.github.io/jq/manual/#field-access" }
            ]
        },
        answer: "\"Alice\""
    },
    {
        id: 1,
        title: "배열 필터링",
        description: "입력 데이터에서 모든 사용자의 name 필드만 추출하세요.",
        jsonData: JSON.stringify([
            { name: "Alice", age: 30 },
            { name: "Bob", age: 25 },
            { name: "Charlie", age: 35 }
        ]),
        template: "",
        hints: [
            "배열의 각 요소에 대해 작업하려면 .[]를 사용하세요.",
            "각 요소에서 name 필드를 가져오려면 .name을 사용하세요.",
            "두 표현식을 조합하면 .[].name이 됩니다.",
            "jq 명령어: `.[] | .name`"
        ],
        knowledge: {
            title: "배열 필터링",
            items: [
                "jq에서 배열의 모든 요소에 대해 작업하려면 .[]를 사용합니다.",
                "이를 '배열 언롤링'이라고 합니다.",
                "예를 들어 .[].name은 배열의 각 객체에서 name 필드를 추출합니다."
            ],
            references: [
                { title: "jq 공식 문서 - 배열 필터링", url: "https://stedolan.github.io/jq/manual/#array-filtering" }
            ]
        },
        answer: "[\"Alice\",\"Bob\",\"Charlie\"]"
    },
    {
        id: 2,
        title: "중첩 배열 필터링",
        description: "입력 데이터에서 모든 상품의 name 필드만 추출하세요.",
        jsonData: JSON.stringify({
            products: [
                { name: "Laptop", price: 1000 },
                { name: "Smartphone", price: 500 }
            ]
        }),
        template: "",
        hints: [
            "products 배열에 접근하려면 .products를 사용하세요.",
            "배열의 각 요소에 대해 작업하려면 .[]를 사용하세요.",
            "각 요소에서 name 필드를 가져오려면 .name을 사용하세요.",
            "세 표현식을 조합하면 .products[].name이 됩니다.",
            "jq 명령어: `.products[].name`"
        ],
        knowledge: {
            title: "중첩 배열 필터링",
            items: [
                "jq에서 중첩된 객체의 배열에 접근하려면 .필드명[].필드명 형식을 사용합니다.",
                "예를 들어 .products[].name은 products 배열의 각 객체에서 name 필드를 추출합니다."
            ],
            references: [
                { title: "jq 공식 문서 - 중첩된 배열 필터링", url: "https://stedolan.github.io/jq/manual/#nested-array-filtering" }
            ]
        },
        answer: "[\"Laptop\",\"Smartphone\"]"
    },
    {
        id: 3,
        title: "조건부 필터링",
        description: "입력 데이터에서 age가 30 이상인 사용자의 name만 추출하세요.",
        jsonData: JSON.stringify([
            { name: "Alice", age: 30 },
            { name: "Bob", age: 25 },
            { name: "Charlie", age: 35 }
        ]),
        template: "",
        hints: [
            "조건을 사용하려면 select() 함수를 사용하세요.",
            "age가 30 이상인 조건은 .age >= 30입니다.",
            "조건을 만족하는 요소의 name을 가져오려면 select(.age >= 30).name을 사용하세요.",
            "jq 명령어: `select(.age >= 30).name`"
        ],
        knowledge: {
            title: "조건부 필터링",
            items: [
                "jq에서 조건부 필터링을 하려면 select() 함수를 사용합니다.",
                "select() 함수는 조건을 만족하는 요소만 선택합니다.",
                "비교 연산자: ==, !=, >, >=, <, <= 를 사용할 수 있습니다."
            ],
            references: [
                { title: "jq 공식 문서 - 조건부 필터링", url: "https://stedolan.github.io/jq/manual/#conditional-filtering" }
            ]
        },
        answer: "[\"Alice\",\"Charlie\"]"
    },
    {
        id: 4,
        title: "배열 변환",
        description: "입력 데이터의 각 사용자에 대해 { name: 이름, isAdult: 성인여부 } 형태로 변환하세요.",
        jsonData: JSON.stringify([
            { name: "Alice", age: 30 },
            { name: "Bob", age: 17 },
            { name: "Charlie", age: 35 }
        ]),
        template: "",
        hints: [
            "각 요소를 변환하려면 map() 함수를 사용하세요.",
            "새로운 객체를 만들려면 { } 구문을 사용하세요.",
            "조건문은 if-then-else 구문을 사용하세요.",
            "jq 명령어: `map({ name: .name, isAdult: .age >= 18 })`"
        ],
        knowledge: {
            title: "배열 변환",
            items: [
                "jq에서 배열을 변환하려면 map() 함수를 사용합니다.",
                "새로운 객체는 { 필드명: 값 } 형식으로 만듭니다.",
                "조건문은 if 조건 then 참일때값 else 거짓일때값 end 형식을 사용합니다."
            ],
            references: [
                { title: "jq 공식 문서 - 배열 변환", url: "https://stedolan.github.io/jq/manual/#array-transformation" }
            ]
        },
        answer: "[{\"name\":\"Alice\",\"isAdult\":true},{\"name\":\"Bob\",\"isAdult\":false},{\"name\":\"Charlie\",\"isAdult\":true}]"
    },
    {
        id: 5,
        title: "배열 정렬",
        description: "입력 데이터를 age 기준으로 내림차순 정렬하세요.",
        jsonData: JSON.stringify([
            { name: "Alice", age: 30 },
            { name: "Bob", age: 25 },
            { name: "Charlie", age: 35 }
        ]),
        template: "",
        hints: [
            "정렬하려면 sort_by() 함수를 사용하세요.",
            "내림차순 정렬은 sort_by(-.age)를 사용하세요.",
            "마이너스(-)를 붙이면 내림차순이 됩니다.",
            "jq 명령어: `sort_by(-.age)`"
        ],
        knowledge: {
            title: "배열 정렬",
            items: [
                "jq에서 배열을 정렬하려면 sort_by() 함수를 사용합니다.",
                "오름차순: sort_by(.필드명)",
                "내림차순: sort_by(-.필드명)"
            ],
            references: [
                { title: "jq 공식 문서 - 배열 정렬", url: "https://stedolan.github.io/jq/manual/#array-sorting" }
            ]
        },
        answer: "[{\"name\":\"Charlie\",\"age\":35},{\"name\":\"Alice\",\"age\":30},{\"name\":\"Bob\",\"age\":25}]"
    },
    {
        id: 6,
        title: "배열 집계",
        description: "입력 데이터에서 age의 평균값을 계산하세요.",
        jsonData: JSON.stringify([
            { name: "Alice", age: 30 },
            { name: "Bob", age: 25 },
            { name: "Charlie", age: 35 }
        ]),
        template: "",
        hints: [
            "모든 age 값을 가져오려면 .[].age를 사용하세요.",
            "평균을 계산하려면 add/length를 사용하세요.",
            "전체 표현식은 ([.[].age] | add / length)가 됩니다.",
            "jq 명령어: `([.[].age] | add / length)`"
        ],
        knowledge: {
            title: "배열 집계",
            items: [
                "jq에서 배열의 합계를 계산하려면 add 함수를 사용합니다.",
                "배열의 길이는 length 함수로 구할 수 있습니다.",
                "평균은 (배열 | add / length)로 계산합니다."
            ],
            references: [
                { title: "jq 공식 문서 - 배열 집계", url: "https://stedolan.github.io/jq/manual/#array-aggregation" }
            ]
        },
        answer: "30"
    },
    {
        id: 7,
        title: "객체 변환",
        description: "입력 데이터를 { 이름: 나이 } 형태로 변환하세요.",
        jsonData: JSON.stringify([
            { name: "Alice", age: 30 },
            { name: "Bob", age: 25 },
            { name: "Charlie", age: 35 }
        ]),
        template: "",
        hints: [
            "객체로 변환하려면 map({ }) 구문을 사용하세요.",
            "키-값 쌍을 만들려면 { 키: 값 } 형식을 사용하세요.",
            "전체 표현식은 map({ (.name): .age })가 됩니다.",
            "jq 명령어: `map({ (.name): .age })`"
        ],
        knowledge: {
            title: "객체 변환",
            items: [
                "jq에서 배열을 객체로 변환하려면 map() 함수를 사용합니다.",
                "동적 키를 사용할 때는 (표현식): 값 형식을 사용합니다.",
                "예: map({ (.name): .age })는 이름을 키로, 나이를 값으로 하는 객체를 만듭니다."
            ],
            references: [
                { title: "jq 공식 문서 - 객체 변환", url: "https://stedolan.github.io/jq/manual/#object-transformation" }
            ]
        },
        answer: "{\"Alice\":30,\"Bob\":25,\"Charlie\":35}"
    },
    {
        id: 8,
        title: "중첩 객체 필터링",
        description: "입력 데이터에서 score가 80 이상인 과목의 이름만 추출하세요.",
        jsonData: JSON.stringify({
            student: {
                name: "Alice",
                subjects: [
                    { name: "Math", score: 85 },
                    { name: "English", score: 75 },
                    { name: "Science", score: 90 }
                ]
            }
        }),
        template: "",
        hints: [
            "subjects 배열에 접근하려면 .student.subjects를 사용하세요.",
            "조건을 사용하려면 select() 함수를 사용하세요.",
            "전체 표현식은 .student.subjects[] | select(.score >= 80).name이 됩니다.",
            "jq 명령어: `.student.subjects[] | select(.score >= 80).name`"
        ],
        knowledge: {
            title: "중첩 객체 필터링",
            items: [
                "jq에서 중첩된 객체의 배열에 접근하려면 .필드명.필드명[].필드명 형식을 사용합니다.",
                "조건부 필터링은 select() 함수와 함께 사용합니다.",
                "파이프(|) 연산자를 사용하여 필터를 연결할 수 있습니다."
            ],
            references: [
                { title: "jq 공식 문서 - 중첩된 객체 필터링", url: "https://stedolan.github.io/jq/manual/#nested-object-filtering" }
            ]
        },
        answer: "[\"Math\",\"Science\"]"
    },
    {
        id: 9,
        title: "복합 변환",
        description: "입력 데이터에서 각 과목의 평균 점수를 계산하고, 80점 이상인 과목만 선택하세요.",
        jsonData: JSON.stringify({
            students: [
                {
                    name: "Alice",
                    subjects: [
                        { name: "Math", score: 85 },
                        { name: "English", score: 75 }
                    ]
                },
                {
                    name: "Bob",
                    subjects: [
                        { name: "Math", score: 90 },
                        { name: "English", score: 80 }
                    ]
                }
            ]
        }),
        template: "",
        hints: [
            "모든 과목을 가져오려면 .students[].subjects[]를 사용하세요.",
            "과목별로 그룹화하려면 group_by(.name)을 사용하세요.",
            "각 그룹의 평균을 계산하려면 map({ name: .[0].name, avg: ([.[].score] | add / length) })를 사용하세요.",
            "jq 명령어: `group_by(.name) | map({ name: .[0].name, avg: ([.[].score] | add / length) })`"
        ],
        knowledge: {
            title: "복합 변환",
            items: [
                "jq에서 배열을 그룹화하려면 group_by() 함수를 사용합니다.",
                "그룹화된 데이터는 map() 함수로 변환할 수 있습니다.",
                "복잡한 변환은 여러 필터를 파이프(|)로 연결하여 수행합니다."
            ],
            references: [
                { title: "jq 공식 문서 - 복합 변환", url: "https://stedolan.github.io/jq/manual/#complex-transformation" }
            ]
        },
        answer: "[{\"name\":\"Math\",\"avg\":87.5}]"
    }
];

export default stages;