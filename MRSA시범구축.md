시범 구축 도메인 : 스마트 제조 (스마트 팩토리 등)

제조산업에서 활용할 수 있는 자동화된 workflow구축이 스마트 제조이다.

1. 자동화된 workflow를 더욱 고도화 시켜 특정 업무를 잘 해낼 수 있는 Agent를 만들겠다.

   - ### ✔ “특정 업무를 잘하는 Agent를 구성하는 것”(single Agent/ MCP/ Tool Agent)

     - 설비 이상 감지 Agent
     - 작업지시 생성 Agent
     - 생산계획 자동 조정 Agent
     - 불량 유형 분류 Agent
     - 공정 파라미터 제안 Agent

     이런 식으로 **업무 단위별 DSLM(도메인 특화 모델) 에이전트**가 생기고
      기존 MES/ERP/PLC 로그와 연동해 능동적으로 판단하게 된다.

     ➡ **스마트 제조의 자동화→지능화로 넘어가는 핵심 축**.

     

2. 스마트 제조 Workflow에서 생기는 로그 데이터 분석을 기반으로 한 Intent분석을 넣겠다. 

   - ## **2. 로그 기반 Intent 분석 → “AI Orchestrator”의 두뇌 만들기**

     ## (Orchestrator + A2A Layer)

     스마트 팩토리에서는 생각보다 많은 로그가 있다:

     - 설비 로그(센서, PLC)
     - 품질 로그
     - 알람 로그
     - 작업지시 로그
     - 생산 실적 로그
     - 작업자 행동 로그
     - 챗봇/문서 조회 로그

     이걸 AI로 분석하면 공정의 “의도”가 보인다.

     ### ✔ 로그 기반 Intent 분석이 하는 일

     - 어떤 상황에서 어떤 조치를 취했는지 패턴 학습
     - 작업자가 무엇을 원하는지 자동 추론
     - 공정 이상을 미리 예측하는 Trigger 생성
     - Agent에게 어떤 액션을 던질지 판단하는 정책(policy) 역할

     즉, Intent 분석은 단순 NLP가 아니라
      **“스마트 제조 Agent 시스템의 브레인(Brain Layer)”**이다.

     ➡ 이걸 넣어야 Agent가 **진짜 사람처럼 판단**하고 움직인다.



# 제조 지식기반 Agentic RAG 시스템 기획안 (MVP 버전)

## 1. 개요

제조 현장에서 발생하는 문서, 점검표, 설비 일지, 라벨, 성적서 등은 대부분 비정형 형태이며, 인식 정확도는 품질 및 공정 관리에 직접적인 영향을 준다. 특히 손글씨 데이터는 OCR 정확도를 크게 떨어뜨리며, 0.1% 오류도 공정 전체에 영향을 주는 경우가 많다.

Query Decomposition은 들어가야겠군.

Query Rewrite도 기본적으로 넣고

Reranker도 넣어야지

 이를 해결하기 위해 OCR(문서 인덱싱, 도메인 강화용 지식), RDB(실제 오류율 등의 정보), Graph DB(스키마 adviser), Text-to-SQL(RDB Search), Text-to-SPARQL(Text to SQL Advise), Agentic Retry(자동화) 기반의 통합 파이프라인을 구축한다.

본 문서는 해당 파이프라인의 MVP 아키텍처와 핵심 기능을 정의한다.

## 2. 시스템 목표

1. 제조 문서의 텍스트 자동 추출 및 구조화
2. 자연어 기반 SQL 질의 처리(Text-to-SQL)
3. RDB 스키마를 기반으로 한 Graph 자동 구성
4. 자연어 기반 Graph 질의(Text-to-SPARQL)
5. OCR 실패 시 Agentic 재시도 및 보정 처리
6. 문서, DB, 그래프를 통합한 정밀한 지식 접근 제공

## 3. 핵심 기능

### 3.1 다단계 OCR 파이프라인

기본적으로 문서 레이아웃 파싱과 일반 텍스트 인식은 PaddleOCR 구조를 사용한다.
 손글씨 혹은 저품질 영역처럼 일반 OCR이 실패한 경우 다음 전략을 적용한다.

1. 텍스트 검출: CRAFT 모델
2. 글자 인식: Swin Transformer 기반 HTR 모델
3. 인식 신뢰도 기반 선별 처리
4. 도메인 규칙(길이, 형식, 범위) 기반 2차 검증
5. 허용 범위 외 결과는 Agentic 재추론

이 구조는 일반 문서와 손글씨 문서 모두를 커버하는 유연성을 제공한다.

### 3.2 문서 레이아웃 파싱

PaddleOCR의 구조화 모듈을 활용해 문서를 영역 단위로 분리한다.
 구성 요소는 다음과 같다.

- 제목
- 파라미터 라인
- 표 영역
- Key-Value 구조
- 서명/메모 등 비정형 영역

각 구역은 Semantic Classification Agent가 자동으로 타입을 분류한다.
 (예: 품목코드, 공정명, LOT, 설비 ID 등)

### 3.3 RDB 기반 Text-to-SQL

정형 질의에 대해 문서를 조회하지 않고 직접 DB와 연결한다.

- 작업자의 질문을 자연어에서 SQL로 변환
- RDB 스키마 이해를 기반으로 JOIN, GROUP BY, 조건절 생성
- 제조 도메인에 맞는 제약 기반 검증 수행
- 최종 값을 직접 DB에서 가져오기 때문에 응답 정확도가 높음

### 3.4 RDB → Graph Schema 자동 변환

정형 데이터와 비정형 데이터가 동일 시스템에서 활용되기 위해선 지식 구조화가 필요하다.

- 테이블 → Node
- 외래키(FK) → Edge
- 컬럼 의미를 기반으로 엔티티 타입 결정
- 문서에서 추출된 엔티티도 Graph에 동적 추가 가능

Graph 엔진(Neo4j 또는 RDF 트리플스토어)을 사용해 제조 지식 구조를 일관성 있게 유지한다.

### 3.5 Text-to-SPARQL 기반 의미 질의

Graph가 구축된 이후에는 복잡한 의미 관계 질의를 자연어로 키워낼 수 있다.

예시:

- 특정 라인에서 특정 공정과 품목 조합의 불량률 변화
- 동일 공정군에서 발생한 이상값의 공통 패턴
- 설비 번호, 작업자, 일정, 품목 조합의 이상 관계 탐색

Text-to-SPARQL Agent가 SPARQL로 변환하고 그래프에서 직접 조회한다.

### 3.6 Agentic Retry 기반 정확도 보정

OCR, SQL 생성, SPARQL 생성, 레이아웃 파싱에서 신뢰도가 낮은 경우 자동 재시도한다.

재시도 전략은 다음과 같다.

- OCR 재추론: 전처리 변경, 다른 OCR 모델 시도
- 비정형 텍스트: 세부 영역 crop 기반 재인식
- SQL 오류: 문법 보정, 스키마 재참조 후 재생성
- SPARQL empty result: 그래프 탐색 범위 조정
- 도메인 규칙 위배: 후보값 생성 후 보정

이 과정은 Supervisor Agent가 orchestration한다.

## 4. 전체 아키텍처 흐름

1. 문서 입력
2. PaddleOCR 기반 1차 OCR 및 레이아웃 파싱
3. 신뢰도 하락 영역 탐지
4. CRAFT + Swin Transformer 기반 2차 OCR
5. Layout → 구조화 → Key-Value 추출
6. 데이터가 RDB 스키마와 매핑
7. 자연어 질의 입력
8. Text-to-SQL 또는 Text-to-SPARQL 선택
9. DB 혹은 Graph에서 직접 질의
10. Agentic Retry 적용
11. 최종 응답 반환

## 5. 기대 효과

- 손글씨 포함 제조 문서 처리 정확도 향상
- 문서 기반 RAG의 불안정성을 제거
- 정형·반정형·비정형 데이터를 하나의 파이프라인에서 처리
- 자연어로 RDB와 Graph를 동시에 다루는 구조 확립
- 기존 OCR 파이프라인 실패율을 크게 감소
- Agent 기반 재시도 덕분에 결과 품질의 균일성 확보

## 6. MVP 범위

1. PaddleOCR + CRAFT/Swin 기반 OCR 파이프라인
2. RDB 스키마 기반 Text-to-SQL 모듈
3. RDB → Graph 자동 스키마 변환
4. Text-to-SPARQL 기본 프로토타입
5. Agentic Retry의 핵심 로직(재추론, 재질의, 보정)
6. 전체 흐름을 통합하는 Supervisor Agent

## 7. 추가 개발 예정

- 제조 표준규격 기반 룰셋 고도화
- 공정/설비/품목 시맨틱 라벨링 개선
- Graph 기반 이상탐지 모델 추가
- HTR(손글씨) 전용 모델 성능 개선
- 현장 카메라/스캐너 환경에서의 실시간 처리



[Data & Tech]

Dataset(AI-Hub)

```

```

MCP Server(local hub)

```

```



[ __ Agent Card ]

```

```

[ __ Agent Card ]

```

```

