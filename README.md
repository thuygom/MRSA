# 🏭 MRSA: Multi-Reasoning Smart Agent

### **A2A 기반 스마트 제조 Agentic RAG 시스템**

> 제조 현장의 *문서 기준*과 *RDB 공정 데이터*를 A2A 기반 에이전트 협업으로 자동 연결하는 스마트 제조용 AI Agent.

------

## 📌 Overview

MRSA는 제조 라인의

- 비정형 문서(작업기준서, 점검표, 라벨, 손글씨)
- SQL 기반 공정데이터(LOT, 불량, 측정값)

두 세계를 하나의 A2A Agent Mesh로 묶어주는 구조다.

**문서는 기준을 말하고, DB는 실제 수치를 말하는데
 둘을 사람이 매번 수작업으로 맞춰보는 불합리한 구조를 AI가 대신한다.**
 MRSA는 문서 → 기준 추출 → DB 조회 → 정합성 판단 → 이상 탐지까지
 하나의 자동화 흐름으로 묶는다.

------

## 🚨 Problem Definition

MVP_MRSA

제조 현장은 *문서와 실측 데이터가 계속 어긋나는 구조적 문제*가 있다.

1. **문서는 비정형, 공정데이터는 SQL**
    → 두 정보가 따로 놀아서 기준 확인 + 조회를 동시에 하기 어렵다.
2. **문서 내부의 손글씨·라벨 등 비정형 정보가 자동 처리 불가**
    → 기준·절차를 시스템이 이해하지 못해 사람이 매번 읽고 적용해야 함.
3. **기준(문서) vs 실제값(RDB) 정합성이 늦게 확인**
    → 사람마다 결과가 달라지고 이상 감지가 늦어져 품질 리스크 증가.
4. **KPI**
   - 문서+DB 조회 및 판단 시간 단축
   - 자동화율 증가
   - 판단 일관성 확보
   - 이상 감지 리드타임 감소
   - 생산 효율 및 품질 안정성 향상

------

## 🧠 A2A-based Solution Architecture

MRSA는 **A2A(Agent-to-Agent) 프로토콜 기반 멀티에이전트 협업 구조**로 설계되어,
 문서·공정데이터·기준·판단·이상 감지를 각각 서로 다른 Agent가 담당한다.

```
Operator Query → Orchestrator Agent  
→ Document Intelligence Agent  
→ SQL Data Agent  
→ Validation Agent  
→ Anomaly Agent  
→ Final Reasoning Agent → Answer
```

각 Agent는 독립된 Skill을 갖고 A2A로 호출된다.

### 🔹 Orchestrator Agent

사용자 요청 해석, 플로우 라우팅, 필요한 Agent 자동 호출.

### 🔹 Document Intelligence Agent

- 비정형 문서 OCR
- 손글씨 인식
- 라벨 및 절차/기준 정보 추출
- 텍스트 → 구조적 기준 데이터 변환

### 🔹 SQL Data Agent

- LOT / 측정값 / 검사값 조회
- 기준 대비 실제값 조회
- 통합 데이터 시그널 생성

### 🔹 Validation & Rule Agent

- 기준 vs 실측 데이터 비교
- 공정 허용치 편차 분석
- 누락값, 이상값 검출

### 🔹 Anomaly Reasoning Agent

- 공정 이상 감지
- 이상 유형 자동 분류
- 필요 시 원인 후보군 제시

### 🔹 Final Report Agent

- 결과 종합
- Actionable insight 제공
- 필요 시 근거 그래프 시각화

------

## 🚀 Key Features

MVP_MRSA

### **1) 비정형 문서 정규화 AI**

- 작업표준서 / 기준서 / 점검표 / 라벨 / 서명 / 손글씨 자동 인식
- 기준·규격·절차를 구조화된 JSON으로 변환

### **2) SQL 데이터 자동 조회**

- LOT / 공정별 측정값 / 불량 정보 자동 매핑
- 문서 기준과 조합하여 즉시 정합성 판단

### **3) 기준·실측 데이터의 단일 흐름 연결**

- “문서 → 규격 → 공정 데이터 → 비교 → 이상 판단”
- 기존 사람 수작업 5단계를 Agent가 자동 수행

### **4) Multi-Agent 협업 기반 Auto-Validation**

- 기준 대비 허용치 초과 판단
- 수치 변동 트렌드 기반 이상 감지
- 공정 단계별 Root cause 후보 제안

### **5) 제조 특화 시나리오 자동 생성**

- 작업자 질문 기반 실시간 조치 제안
- LOT 확인 / 측정값 확인 / 기준 재확인 자동 처리

------

## 🗂 Data & Tech Plan

MVP_MRSA

### 📘 **Data**

- 비정형 문서(PDF/JPG/Handwriting)
- OCR / Vision Model 기반 라벨 인식
- 제조 RDB (SQL: LOT, 측정값, 불량코드)
- 공정별 기준 DB (규격·허용치)

### 🔧 **Tech**

- A2A Protocol 기반 Multi-Agent Architecture
- Document OCR + LayoutLM + Handwriting Recognition
- SQL Retrieval Agent (RAG + DB Tool-call)
- Rule-based & LLM Reasoning 혼합 Validation 엔진
- Knowledge Graph 기반 기준-실측 매핑 (옵션)
- Streamlined Agent Orchestration

### ⚙️ 장애요소 & 해결 전략

- 문서 포맷 다양 → Layout-aware OCR 적용
- 필드 오차 → Post-OCR Correction
- 공정마다 규격 다름 → Configurable Rule Engine
- 실측데이터 누락 → 자동 누락값 보정 로직

------

## 🎬 User Scenario

MVP_MRSA

### 📌 시나리오: LOT 불량 원인 자동 판단

1. 작업자가 질문:
    “LOT 202512-A 측정값이 기준 안 맞는 것 같은데, 원인 찾아줘.”
2. **Orchestrator Agent**
    → Document Intelligence 호출
    → 해당 공정 기준 문서 로딩
3. **Document Agent**
    → 규격: ±0.05
    → 공정 순서: ①압연 ②절단 ③세척
    → 기준 JSON 반환
4. **SQL Data Agent**
    → LOT 데이터 조회
    → 최근 값 3건에서 편차 +0.08 검출
5. **Validation Agent**
    → 기준 초과 판단
    → 영향 단계: “절단 공정”
6. **Anomaly Agent**
    → 절단 공정 기기 편차 증가 패턴 분석
    → 원인 후보: “칼날 마모”, “파티클 잔여물”
7. **Final Agent**
    → 종합 보고서 생성
    → “즉시 절단 공정 점검 필요” 추천

------

## 📈 Expected Impact & Expansion

MVP_MRSA

### 🎯 핵심 효과

- 문서+DB 조회 자동화 → 검사시간 단축
- 공정 판단 일관성 확보
- 이상 발견 시간 단축
- 작업자 숙련도 편차 감소
- 품질 안정성 향상
- 전체 생산성 상승

### 🧩 확장성

- 모든 공정 문서 자동 파싱
- 장비 로그까지 연동한 예지보전(PdM)
- Agent 기반 전체 제조 운영 자동화
- BOM·MES·ERP와 연결한 통합 RAG
- Vision 검사와 결합한 E2E 품질관리 AI

------

# 📦 Project Structure (예시)

```
mrsa/
│
├─ orchestrator/
├─ agents/
│   ├─ document_agent/
│   ├─ sql_agent/
│   ├─ validation_agent/
│   ├─ anomaly_agent/
│   └─ report_agent/
│
├─ models/
│   ├─ ocr/
│   ├─ reasoning/
│   └─ anomaly/
│
└─ data/
```

------

# 🧾 License

본 프로젝트는 스마트 제조 AI Agent Hackathon 2025 제출용으로 제작됨.