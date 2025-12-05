#A2A Agent to Agent란 무엇인가? (A2A의 정의)

Google이 다양한 기술 파트너들과 함께 AI 에이전트 간의 상호 운용성을 위한 오픈 프로토콜 Agent2Agent(A2A)를 공개했다. Anthropic의 MCP와도 호환되는 이 프로토콜은, LangChain, Cohere, Salesforce, MongoDB, SAP 등 수십 개 기업이 참여하고 있어 향후 에이전트 기반 AI 서비스 구축에 중요한 기준이 될 것이다.

A2A(Agent-to-Agent) 프로토콜은 서로 다른 AI 에이전트 간의 통신과 협업을 가능하게 하는 **개방형 표준**이다. A2A는 다양한 프레임워크, 개발사, 조직에서 만들어진 에이전트들이 공통된 방식으로 상호작용할 수 있도록 표준화된 언어와 규칙을 제공한다. 이를 통해 기존에 개별 시스템 안에 고립되어 있던 에이전트들을 하나의 연결된 생태계로 통합할 수 있다.

AI 에이전트는 각자의 환경에서 독립적으로 문제를 해결하는 자율적 시스템이지만, 서로 다른 구조와 인터페이스를 갖기 때문에 상호 협력이 쉽지 않았다. A2A 프로토콜은 이러한 이질성을 해소하고, 이기종 에이전트 간의 능력 공유와 협업 흐름을 자연스럽게 연결한다. 즉, A2A는 서로 다른 개발자가 만든 에이전트, 다른 기술 스택으로 구축된 에이전트, 서로 다른 기관이 운영하는 에이전트가 **하나의 네트워크에서 유기적으로 협력할 수 있도록 하는 상호운용성(Interoperability)의 핵심 표준**이다.

요약하면, A2A는 에이전트 생태계 전반의 상호 호환성을 보장하며, 다양한 에이전트들이 함께 작동해 복잡한 문제를 공동으로 해결할 수 있도록 설계된 통신·협업 표준이다.



### 예를 들면, 다음과 같은 다중에이전트 시스템(MAS, Multi Agent System)이 있다.

고객 문의가 들어오면 자동으로 답변하는 고객 상담 에이전트
재고가 부족하면 알아서 발주를 넣고 관리하는 재고 관리 에이전트
회의 일정을 조율해주는 스케줄링 에이전트

### 하지만 다중 에이전트 시스템에는 문제가 있었다. 바로 에이전트들 간의 상호작용이 어렵다는 점이다.

고객이 고객 상담 에이전트에게 "주문한 상품이 언제와요?" 라고 물어봐도, 고객 상담 에이전트가 재고관리 에이전트에게 "관련 발주 상황 알려주세요" 라고 요청을 보낼 수 없다는 것이다. **서로 사용하는 언어가 다르기 때문이다.**



구글이 이 문제를 해결할 방법을 들고 왔다. 그것이 바로 Agent to Agent(A2A) 프로토콜이다.

## 2025년 4월, 구글이 "AI 에이전트들끼리 대화하게 해주겠다"면서 A2A프로토콜을 발표했다.

<img src="C:\Users\repli\Desktop\A2A\resource\A2A.PNG" alt="A2A" style="zoom:50%;" />

A2A의 핵심은 간단하다. 서로 다른 회사 혹은 같은 회사이던 A2A 통신규약만 지원한다면 협업할 수 있다는 것이다.

고객이 "주문한 상품 언제와요?"라고 물어봤을 때 주문관리 에이전트가 주문정보를 찾고, 배송관리 에이전트에게 "이 주문 배송 상태 어때?"라고 물어보고 배송에이전트가 답변하면 최종적으로 고객에게 통합된 답변을 준다.



##AI Agent들이 상호작용할 수 없었던 이유(MAS, Multi Agent System의 문제점)

기존 Multi-Agent System(MAS)은 서로 독립적으로 운영되는 에이전트 간 협업을 전제로 했지만, 실제로는 다음과 같은 구조적 한계로 인해 상호작용이 거의 불가능했다.

- ### 1) 통신 프로토콜 표준 부재 (Integrations, Interoperability, Scalability, Innovation)

  각 에이전트가 서로 다른 API·전송 프로토콜·데이터 포맷을 사용함으로써, 상호 호출을 위한 공통 인터페이스가 존재하지 않았다.

  - A사는 REST + JSON
  - B사는 GraphQL + XML
  - C사는 gRPC + Protobuf

  에이전트 간 통신은 매번 별도의 custom integration이 필요했고, 에이전트가 늘어날수록 복잡도는 기하급수적으로 증가했다.

- ### 2) 임의 API·임의 함수명에 의한 인터페이스 혼란 (Agent Exposure 문제의 핵심: wrapping required, no uniform method schema)

  에이전트마다 method 이름, required parameter, 입력/출력 구조가 제각각이었다. 이로 인해 “어떤 에이전트가 어떤 기능을 수행하는지”를 자동으로 파악할 방법이 없었다.

  - 자동 Discovery 불가능
  - 능력 검색 불가능
  - 에이전트 연결은 항상 사람이 tool-wrapping을 직접 구성해야만 가능

  A2A 문서에서 말하는 “Agent Exposure 문제”가 여기에 해당한다.

- ### 3) 에이전트 능력(Ability)에 대한 formal schema 부재 (능력을 표현하는 schema가 없어 discovery·interoperability 모두 불가능)

  LLM 기반 Agent가 등장했음에도, 각 Agent의 능력(capability)을 기술하는 표준 문서가 없었다.

  - 함수 스키마 없음
  - 입력/출력 규칙 없음
  - Capability registry 없음
  - 능력 기반 matching 불가

  결과적으로 에이전트 간 협업은 자동화되지 못했고, 모든 연결은 맞춤형(bespoke) 연동 코드에 의존했다.

## 결론

기존 MAS는 표준, 규칙, 스키마, 발견 메커니즘, 보안체계가 모두 부재한 구조였기 때문에 상호운용이 불가능했다.
 A2A는 이러한 문제를 해결하기 위해 도입된 **에이전트 간 통신의 개방형 표준**으로, 이기종 에이전트가 안정적으로 협업할 수 있는 기반을 제공한다.



## A2A의 해결책 : 공통 언어 제공

A2A 프로토콜은 서로 다른 에이전트들이 동일한 방식으로 의사소통할 수 있도록 **표준화된 공통 언어**를 제공한다. 기존에는 에이전트마다 고유한 통신 방식과 데이터 포맷을 사용하며 각자 “자기만의 언어”로 말하고 있었지만, A2A는 이들을 하나의 통일된 방식으로 연결하는 **번역기 역할**을 수행한다.

A2A는 새로운 기술을 추가로 학습할 필요 없이, 이미 광범위하게 사용되는 **HTTP**와 **JSON-RPC** 기반의 웹 표준을 그대로 사용한다. 이로써 복잡한 연동 부담 없이 모든 에이전트가 동일한 규칙 아래 협업할 수 있는 환경이 마련된다.



## A2A가 해결하는 핵심 목표(Key Goals)

- ## 1. 상호운용성 (Interoperability)

  서로 다른 벤더·프레임워크·도메인의 에이전트가 하나의 생태계에서 자연스럽게 협업할 수 있도록 한다.

  ## 2. 보안과 신뢰성 (Security)

  A2A는 HTTPS와 표준 웹 인증 모델을 기반으로 안전한 협업을 보장한다. 또한 에이전트 간 내부 로직을 노출하지 않는 **Opaque Execution**을 통해 IP 보호와 권한 통제를 강화한다.

  ## 3. 비동기 우선 설계 (Async-first)

  에이전트 간 상호작용은 즉시 반환되지 않는 장기 작업(Long-running tasks)이 일반적이기 때문에, A2A는 다음을 기본 구조로 채택한다.

  - SSE 기반 실시간 스트리밍
  - Polling 기반 상태 조회
  - Webhook 기반 비동기 푸시

  즉, 사람 개입(Human-in-the-loop)이나 장기 작업도 자연스럽게 처리된다.

  ------

  ## 4. 모달리티 독립성 (Modality-independent)

  A2A는 단순 텍스트가 아니라 파일, 구조화 데이터(JSON), 이미지, 오디오 등 다양한 Part 형식을 지원한다. 덕분에 시각·음성·문서 기반 에이전트가 동일한 프로토콜로 데이터를 교환할 수 있다.

  ------

  ## 5. 단순하고 표준화된 구조 (Simple & Standardized)

  A2A는 새로운 복잡한 기술을 도입하지 않고, 이미 업계 표준인 **HTTP / JSON-RPC 2.0 / SSE**만을 사용한다.

  이는 다음을 의미한다:

  - 기존 인프라와 완전히 호환된다



## A2A 커뮤니케이션의 핵심 Element

| 요소(Element)  | 설명(Description)                                            | 주요 목적(Key Purpose)                                       |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Agent Card** | 에이전트의 정체성(identity), 능력(capabilities), 엔드포인트(endpoint), 스킬(skills), 인증(auth) 요구사항을 기술한 JSON 메타데이터 문서. | 클라이언트가 에이전트를 **발견(discover)**하고, **안전하고 올바르게 상호작용**할 수 있도록 정보를 제공한다. |
| **Task**       | 고유 ID와 명확한 생명주기(lifecycle)를 가진, 에이전트가 생성하는 **상태 기반 작업 단위(stateful unit of work)**. | 장기 작업(long-running operations) 추적 및 **멀티턴 상호작용**과 **에이전트 간 협업**을 가능하게 한다. |
| **Message**    | 클라이언트와 에이전트 간의 단일 턴(single turn) 커뮤니케이션. “user” 또는 “agent” 역할(role)과 내용(content)을 포함한다. | 지시(instruction), 컨텍스트(context), 질문, 답변, 상태 업데이트 등 다양한 정보를 전달한다. |
| **Part**       | Message와 Artifact를 구성하는 **기본 콘텐츠 단위(content container)**. TextPart, FilePart, DataPart 등이 포함된다. | 다양한 형태의 콘텐츠를 자유롭게 교환할 수 있도록 **유연성(flexibility)**을 제공한다. |
| **Artifact**   | Task 수행 과정에서 에이전트가 생성하는 **실제 산출물(output)**. 문서, 이미지, 구조화 데이터 등이 포함된다. | 에이전트의 작업 결과를 **구조화되고 재사용 가능한 형태**로 전달한다. |



## A2A 상호작용 메커니즘(Interaction Mechanisms)

A2A는 에이전트 간 작업 특성에 따라 서로 다른 방식으로 통신할 수 있도록 세 가지 상호작용 패턴을 제공한다. 이는 복잡도, 작업 시간, 실시간성 요구에 따라 가장 적합한 방식을 선택하게 해준다.

<details> <summary><strong>1) Request / Response (Polling)</strong></summary>
가장 단순한 요청–응답 모델
클라이언트가 요청을 보내면 서버가 즉시 결과 또는 진행 상태를 반환
장시간 걸리는 작업은 클라이언트가 주기적으로 서버에 상태를 물어보는 Polling 방식으로 처리
</details>

<details> <summary><strong>2) Streaming (Server-Sent Events, SSE)</strong></summary>
실시간 진행 상황 또는 중간 결과가 필요한 경우 사용
클라이언트가 스트림을 열면 서버는 여러 번에 걸쳐 증분(incremental) 결과를 전달
예: 모델 생성 과정 중간 로그, 점진적 문서 생성, 분석 프레임 스트리밍
</details>

<details> <summary><strong>3) Push Notifications (Webhook 기반)</strong></summary>
매우 오래 걸리는 작업이나 클라이언트가 연결을 유지할 수 없는 경우 사용
서버가 작업 상태 변화가 있을 때 클라이언트가 제공한 Webhook으로 비동기 알림 전송
</details>
## A2A Agent Card

Agent Card는 “디지털 명함”에 해당하는 JSON 문서다. 클라이언트가 이 문서를 읽고 다음을 판단한다:

- 이 에이전트가 어떤 작업을 수행할 수 있는가(capabilities)

- 어떤 엔드포인트(URL)로 어떻게 호출해야 하는가

- 인증 방식은 무엇인가

- 입력/출력 형태는 무엇인가

즉, Agent Card는 자동 Discovery → 자동 연동을 가능하게 해주는 핵심 메타데이터다.

## A2A Message & Part 구조

Message는 에이전트와 클라이언트가 주고받는 하나의 대화(turn)이다.

- "role": user 또는 agent

- "messageId": 고유 식별자

- "parts": 실제 콘텐츠를 담는 기본 단위

A2A가 **모달리티 독립(Modality-Independent)**을 보장하는 이유가 바로 이 parts 구조 덕분이다.

<details> <summary><strong>주요 Part 종류</strong></summary>
<pre>TextPart — 일반 텍스트
FilePart — 파일(Base64 또는 URI), name/mimeType 포함
DataPart — 구조화된 JSON 데이터 (파라미터, 폼 데이터 등)</pre>
</details>

## A2A Artifact

Artifact는 “산출물(Output Deliverable)” 그 자체다.

- 단순 메시지와 달리 실제 결과물을 의미

- 예: 이미지, 문서, 분석 보고서 JSON, 중간 생성 결과 등

- 고유 artifactId 보유

- 메시지와 동일하게 여러 Part로 구성되며, 스트리밍 전송 가능

Artifact는 Task 라이프사이클과 강하게 결합되어 있어, 작업의 진짜 결과물만 따로 관리할 수 있다.

## Agent Response: Task 또는 Message

A2A 서버(Remote Agent)는 요청을 처리할 때 두 가지 방식 중 하나로 응답한다.

<details> <summary><strong>① Message 반환 — 즉시 응답 가능한 경우</strong></summary>
계산이 빠른 경우
단순 질의응답
즉시 답변 가능한 lightweight한 요청
</details> 

<details> <summary><strong>② Task 반환 — 장기 작업(Long-Running Operations)</strong></summary>
고비용 연산
외부 API 연동
데이터 처리/분석/생성 작업
여러 단계의 협업이 필요한 복합 에이전트 작업
Task는 고유 taskId, 상태(state), 진행률, 생성된 artifacts 등을 포함하며
Streaming, Polling, Push를 통해 계속 추적할 수 있다.
</details>



## 쇼핑몰을 예시로 본 A2A의 실제 작동 방식

쇼핑몰에서 "주문한 상품 언제 와요?"라는 고객문의 예시를 기반으로 설명해 보겠다.

여기서 에이전트는 다음과 같다

- 고객상담 에이전트( 고객 문의 처리/ 주문 조회 )
- 주문관리 에이전트( 주문 상태 확인/ 배송 추적)
- 배송추적 에이전트( 실시간 배송 위치/ 예상 도착 시간)

<img src="C:\Users\repli\Desktop\A2A\resource\쇼핑몰.PNG" alt="쇼핑몰" style="zoom:80%;" />

### Step 1. 에이전트 카드(Capability Schema Layer)

각 AI 에이전트는 자신이 처리할 수 있는 업무와 기능을 JSON형식의 "에이전트 카드"로 정의해 공개한다. 이 카드에는 "내가 할 수 있는 일", "필요한 입력", "응답 형태"등이 표준화된 방식으로 담겨있어, 다른 에이전트들이 역할을 쉽게 파악할 수 있게 해준다.

<details>
  <summary>에이전트 카드 Example</summary>
  <pre><code>{
  "name": "DeliveryTrackingAgent",
  "description": "주문 번호 기반 배송 상태를 조회하고 최신 배송 이벤트를 반환하는 전문 에이전트",
  "capabilities": ["track_delivery", "get_shipping_status", "estimate_arrival"],
  "endpoint": "https://agent.example.com/shipping/a2a",
  "auth": {
    "type": "bearer",
    "token_url": "https://auth.example.com/token"
  },
  "inputs": {
    "order_id": "string",
    "customer_id": "string(optional)"
  },
  "outputs": {
    "status": "string",
    "last_event": "string",
    "eta": "string"
  }
}</code></pre>
</details>

### Step 2. 능력 발견 (Discovery Layer — Agent Card 기반 capability discovery)

고객이 "주문한 상품 언제 와요?"라고 물으면, 고객상담 에이전트는 질문을 분석해 배송 관련 정보가 필요하다고 판단하고, A2A네트워크에서 해당 기능을 가진 에이전트를 탐색한다.(= 타 Agent의 Agent Card를 확인하고 적절한 Agent를 호출한다)

### Step 3. 작업 위임 (Call Protocol Layer — JSON-RPC 기반의 통신 포맷 정의)

배송추적 에이전트를 찾은 상담 에이전트는 **A2A 프로토콜의 표준 메시지 형식**을 통해 "이 주문의 배송 상태를 확인해줘"라는 요청을 전달합니다.

<details>
<summary><strong>🌐 외부 Agent 호출 (JSON-RPC 2.0)</strong></summary>
<strong>HTTP Headers</strong>
<pre><code>POST https://agent.example.com/shipping/a2a
Content-Type: application/json
Authorization: Bearer {ACCESS_TOKEN}
</code></pre>
<strong>Request Body (JSON-RPC 2.0)</strong>
<pre><code>{
  "jsonrpc": "2.0",
  "id": "req-32455",
  "method": "track_delivery",
  "params": {
    "order_id": "2024-1123-ABCD",
    "customer_id": "C103949"
  }
}
</code></pre>
</details>

<details>
<summary><strong>🏠 내부 Agent 호출 (Vertex AI Agent Framework Origin Format)</strong></summary>
<pre><code>{
  "prompt": {
    "context": "배송 상태 확인 요청",
    "messages": [
      {
        "author": "user",
        "content": "order_id=2024-1123-ABCD 배송 현황 알려줘."
      }
    ]
  }
}</code></pre>
</details>

### Step 4.  결과 통합 (Result Integration)

배송추적 에이전트는 배송상태를 확인해 표준 형식으로 응답하고, 상담 에이전트는 이를 종합해 고객에게 "주문하신 상품은 내일 오후 2시 도착 예정입니다"처럼 **완성된 답변**을 제공한다. 이처럼 A2A는 각 에이전트의 역할을 자동으로 연결하고, 부분적인 결과를 하나의 통합된 응답으로 만들어주는 **디지털 협업 구조의 핵심 메커니즘**이다.

<details>
<summary><strong>🌐 외부 Agent JSON-RPC Response</strong></summary>
<pre><code>{
  "jsonrpc": "2.0",
  "id": "req-32455",
  "result": {
    "status": "in_transit",
    "last_event": "2024-11-23 14:30 물류센터 도착",
    "eta": "2024-11-25"
  }
}
</code></pre>
</details>

<details>
<summary><strong>🏠 내부 A2A 호출 응답</strong></summary>
<pre><code>{
  "output": {
    "text": "현재 배송 상태는 '배송중'이며, 마지막 이벤트는 11-23 물류센터 도착입니다. 도착 예정일은 11-25입니다.",
    "messages": [
      {
        "author": "agent:DeliveryTrackingAgent",
        "content": {
          "status": "in_transit",
          "last_event": "2024-11-23 14:30 도착",
          "eta": "2024-11-25"
        }
      }
    ]
  }
}
</code></pre>
</details>



## Google의 ADK(Agent Development Kit) *별도 시범구축 진행 계획

Google이 제시한 "에이전트 개발 키트"로, Agent를 만들 때 필요한 **표준화된 SDK + Runtime 환경**.

## 구성 요소

- **ADK Runtime** : 실행 환경, 메시지 처리, 컨텍스트 관리, 셋업/리소스 초기화
- **ADK Tool Interface** : Agent가 제공하는 기능을 “Tool”로 선언하는 표준 API
- **Skill/Ability Schema** : Capability 정의를 위한 JSON Schema (A2A의 기반)
- **Event Loop & Coroutine 기반 Agent 실행 모델**
- **Stateful Context Handling** : Conversation state, memory, environment state 관리
- **Prompt Orchestration** : System prompt templates + tool routing

## 목적

- 개발자가 “에이전트의 로직에만 집중”하도록
- 인프라/메시징/스케줄링은 Runtime이 자동 처리
- Agent 개발 난이도를 최소화한 “Agent SDK”



## A2A Core Concepts and Components

<img src="C:\Users\repli\Desktop\A2A\a2a-actors.png" alt="a2a-actors" style="zoom:67%;" />

A2A(Agent-to-Agent) 아키텍처는 사용자의 요청을 대리하여 작업을 수행하는 **A2A Client**와, 외부 서비스 또는 독립적인 AI Agent로서 요청을 처리하는 **A2A Remote(= A2A Server)**로 구성된다. 두 컴포넌트는 A2A 프로토콜(JSON-RPC 2.0 기반)을 통해 상호 통신하며, Agent Card·Task·Message·Artifact 등 표준화된 객체를 교환한다.

## 1. A2A Client (Client Agent)

A2A Client는 사용자(또는 상위 시스템)의 요청을 받아 이를 처리하기 위해 적절한 A2A Remote를 선택하고 호출하는 주체이다. A2A Client는 자체적으로 사용자 인터페이스 역할을 수행하거나, 다른 에이전트의 대리자로 동작할 수 있다.

A2A Client의 주요 기능은 다음과 같다.

### (1) 사용자 요청 수신 및 해석

<details><summary>세부설명</summary>
    사용자가 전달한 자연어 명령 또는 API 요청을 분석하여 필요한 작업(Task)을 정의한다. 작업 수행을 위해 필요한 외부 능력(ability)을 파악하고, A2A Remote Agent를 탐색한다.
</details>

### (2) Agent Discovery 수행

<details><summary>세부설명</summary>
    Capability Registry 또는 사전 구성된 Agent Card 목록을 기반으로, 현재 작업에 적합한 Remote Agent를 식별한다.
 Agent Card에는 해당 Remote Agent가 지원하는 능력(capabilities), 요구 입력, 엔드포인트 정보, 인증 방식 등이 기술되어 있다.
</details>

### (3) A2A 프로토콜 기반 호출 수행

<details><summary>세부설명</summary>
    <pre>선택된 Remote Agent에 대해 A2A JSON-RPC 호출을 생성한다.
 호출은 다음 요소를 포함한다.
- method(수행할 작업)
- params(입력 파라미터)
- contextId(맥락 유지)
- task 또는 message 단위의 상호작용
A2A Client는 호출 결과가 즉시 제공될 경우 Message로 처리하고, 장기 작업의 경우 Remote Agent가 반환한 Task ID를 기반으로 상태를 폴링하거나 스트리밍을 구독한다.</pre>
</details>

### (4) 결과 통합 및 사용자 응답 생성

<details><summary>세부설명</summary>
    Remote Agent로부터 전달된 Message 또는 Artifact를 수신하고 통합하여, 최종 사용자에게 의미 있는 답변을 생성한다.
 A2A Client는 Remote Agent의 내부 로직이나 툴 체계를 알 필요가 없으며, Remote Agent를 Black-box로 취급한다.
</details>

------

## 2. A2A Remote (A2A Server / Remote Agent)

A2A Remote는 외부 호출에 응답하는 원격 Agent로서, A2A 프로토콜을 구현한 HTTP Endpoint를 제공한다. Remote Agent는 특정 도메인에 대한 능력(capabilities)을 Agent Card를 통해 외부에 공개하고, 요청을 수신하면 해당 능력을 실행하여 결과를 반환한다.

A2A Remote의 주요 기능은 다음과 같다.

### (1) A2A 요청 수신 및 검증

<details><summary>세부설명</summary>
    <pre>A2A Remote는 Client로부터 전달된 JSON-RPC 요청을 수신하고, 다음 항목을 검증한다.
- 인증/인가 정보
- 요청 method의 유효성
- 파라미터 스키마 적합성
- contextId 및 taskId 매핑
요청이 유효한 경우 해당 기능을 수행하고, 필요 시 내부 에이전트 또는 툴 체계를 호출한다.</pre>
</details>

### (2) 장기 작업(Task) 처리

<details><summary>세부설명</summary>
    <pre>Remote Agent는 작업이 장기 수행(Long-running)일 경우 새로운 Task를 생성하여 Client에 반환한다.
 Task는 고유한 taskId를 가지며, 상태 업데이트를 다음 방식으로 제공할 수 있다.
- Polling 기반 request/response
- SSE(Server-Sent Events) 기반 스트리밍
- Webhook 기반 push notification
이를 통해 Client는 Remote Agent의 작업 진행 상태를 지속적으로 추적할 수 있다.
</pre>
</details>

### (3) Message 및 Artifact 생성

<details><summary>세부설명</summary>
    <pre>Remote Agent는 다음 두 가지 유형의 응답을 생성할 수 있다.
- Message: 단일 턴 응답. 상태 업데이트, 질의 답변, 진행 상황 보고 등.
- Artifact: 파일, 이미지, 표 구조 데이터 등 실제 산출물을 포함한 결과물.
 Artifact는 여러 Part(텍스트, 파일, 구조화 데이터)를 조합할 수 있으며, Task의 결과로 단계적으로 스트리밍될 수도 있다.
</pre>
</details>

### (4) Black-box 형태의 능력 제공

<details><summary>세부설명</summary>
    <pre>Remote Agent는 내부 도구, 모델, 메모리 구조를 외부에 노출하지 않는다. Client는 Agent Card에 기술된 능력(ability)과 입력/출력 스키마만 알고 호출할 수 있으며, Remote Agent는 이를 기반으로 지정된 작업만 처리한다.</pre>
</details>



## 3. A2A Client – A2A Remote 간 상호작용 구조 요약

아키텍처 관점에서 두 구성요소의 관계는 다음과 같이 정리된다.

1. 사용자는 Client에게 목표를 제시한다.
2. Client는 요청을 분석하고 필요한 능력을 찾기 위해 Agent Card를 조회한다.
3. Client는 적절한 Remote Agent를 선택하여 A2A 호출(JSON-RPC)을 보낸다.
4. Remote Agent는 요청을 실행하고 Message 또는 Task/Artifact 형태로 결과를 반환한다.
5. Client는 결과를 통합하여 사용자에게 최종 응답을 제공한다.

이는 중앙 오케스트레이터 없이도 여러 Remote Agent가 연결된 분산형 Agent Mesh 구조를 통해 자연스러운 협업이 가능함을 의미한다.



## A2A와 기존 MCP와의 차이점

A2A이전에 등장한, Anthropic의 MCP(Model Context Protocol)라는 개념과는 무엇이 다를까? MCP는 AI에이전트가 외부 도구나 데이터에 접근할 수 있게 해주는 프로토콜로, 2024년 11월 발표되었다.

<img src="C:\Users\repli\Desktop\A2A\resource\MCPversusA2A.PNG" alt="MCPversusA2A" style="zoom:50%;" />

그림과 같이, MCP와 A2A는 서로 경쟁하는 개념이 아니다. 서로 다른 레벨에서 AI 에이전트의 역량을 확장해주는 역할을 한다.



## MCP: 도구와 리소스를 연결하는 표준 프로토콜

MCP는 에이전트가 외부 도구나 데이터에 직접 접근할 수 있게 만들어준다. 즉, "에이전트, 이 tool호출하면 너가 Sgate에 글 쓸 수 있어"라는 식으로 도구 사용 능력을 부여하는 것이다.

에이전트를 현업에서 제대로 활용하려면, 단순히 똑똑하기만 해서는 부족하다.
Tool, API, 외부 리소스와 자연스럽게 연결되어 실제 액션을 수행할 수 있어야 하며, 이를 위한 핵심 역할을 하는 것이 바로 **MCP(Model Context Protocol)**이다.
예를 들어, 사용자가 “환율 조회해줘”라고 말하면, 에이전트는 이를 MCP 형식으로 구성된 API 요청으로 변환하여 실제 환율 정보를 가져올 수 있게 된다.

특히 Google의 **ADK(Agent Developer Kit)**는 MCP 기반 도구를 기본적으로 지원하며, 이를 통해 다양한 MCP 서버와의 연동도 손쉽게 구현할 수 있다.

## A2A: 에이전트들끼리도 말이 통해야 한다

A2A는 에이전트가 다른 에이전트와 협업할 수 있게 도와준다. 즉, "고객 상담 에이전트야, 배송관리 에이전트한테 상품 배송 언제 되는지 물어봐" 처럼 업무를 분담하고 조율할 수 있는 구조를 제공한다.

검색, 요약, 의사결정, 실행 등 다양한 역할을 하는 에이전트들이 역할 분담과 협업을 통해 더 똑똑한 결과를 만들어낼 수 있으며, A2A를 통해 쉽게 가능해졌다.
A2A는 동적이고 멀티모달한 커뮤니케이션을 지원하면서도, 각 에이전트가 서로의 메모리나 리소스, 도구를 공유하지 않아도 되는 구조를 가지고 있다.

느슨하게 연결되어 있지만 유기적으로 협업할 수 있는 구조이다. 무엇보다 A2A는 커뮤니티 주도 오픈 스탠다드로 발전 중이며, 이미 Google ADK, LangGraph, Crew AI 등 다양한 프레임워크에서 샘플 코드와 레퍼런스 구현이 제공되고 있다.



결국, **MCP는 개별 에이전트가 더 유능해지는 것이고, A2A는 다중 에이전트 시스템에서 에이전트들이 팀으로 움직이게 만드는 것에 가깝다. 혼자 할 수 있는 일이 늘어나는 것과 다른 사람과 협업하는 능력이 둘 다 중요한 것처럼, MCP와 A2A역시 함께 활용될 수 있는 상호보완적 구조이다.**

| 항목          | MCP (Model Context Protocol)                             | A2A (Agents-to-Agents, Google)                               |
| ------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| 기본 목적     | LLM ↔ 외부 도구/서비스 연동 표준화                       | 다중 Agent 간 상호 호출·협업을 위한 프로토콜/플랫폼          |
| 주체          | 단일 LLM(또는 클라이언트) ↔ 다수 MCP 서버(도구 제공자)   | 다수 Agent ↔ 다수 Agent (LLM/Tool/환경 모두 Agent로 추상화)  |
| API 구조      | JSON-RPC over stdio/transport, tools = method 개념       | JSON-RPC 스타일 A2A 호출(Agent 간 RPC), message 기반 orchestration |
| 통신 방향     | MCP Client ↔ MCP Server (양방향, tool 호출/stream 등)    | Agent ↔ Agent (서로를 호출, 체인/그래프 형태로 엮임)         |
| Discovery     | `list_tools` 등으로 MCP Server capability 조회           | Agent Card로 기능/입력/출력/비용/품질 메타데이터 기반 discovery |
| Registry 개념 | 중앙 Registry 스펙은 없고, 클라이언트가 서버를 직접 구성 | A2A Registry/Directory에서 Agent를 검색·등록·버전 관리       |
| 초점          | “LLM에게 도구를 붙인다”에 초점 (툴링 인터페이스 표준)    | “Agent를 서비스처럼 쓴다/엮는다”에 초점 (Agent 네트워크/마켓 느낌) |



## A2A의 Limitaion(한계점)

### 1. 보안(데이터 거버넌스)

- A 에이전트(예: 우리 회사 ISPark)와 B 에이전트(예: 외부 벤더, 클라우드 LLM)가 서로 호출된다면, 개인정보·내부 문서·고객 계약 정보 등이 제3자에게 노출될 위험이 존재한다.
- 외부 Agent가 실행하는 툴이나 API가 내부 시스템에 대한 쓰기(write) 권한을 가진다면, 의도하지 않은 데이터 변경·유출 가능성도 발생한다.
- 이를 데이터 거버넌스·가드레일·권한 정책으로 막으면 A2A 상호 호출이 거의 불가능해지고, 반대로 완화하면 보안이 취약해진다.
- 기업 환경에서는 “Zero Trust 기반 Agent 인증·감사·격리”가 필수인데, A2A는 아직 이런 Enterprise-grade 보안 체계를 갖추지 못했다.

### 2. 에이전트 간 반복 호출(오케스트레이터/플래너 표준 규격 없음)

- Agent A가 Agent B를 호출하고, B가 C를 호출하며, Intent 추론 실패·도구 부족·정보 부족으로 인해 “업무 미루기(delegation cascade)”가 발생할 수 있다.
- 이 구조는 loop, 재시도, 반복 호출이 누적되면서 응답 지연(latency)이 증가하고, 비용도 크게 증가한다.
- 결국 Orchestrator 또는 Planner Agent, Max Depth, Delegation Blocking, Call Graph 최적화가 필수지만 A2A 표준 내부에는 아직 강제 규격이 존재하지 않는다.

### 3. 표준화 부족(Interoperability & Compatibility)

- A2A도 JSON-RPC 기반이지만, 실제 구현은 벤더마다 다르게 변형될 가능성이 높다.
- Agent Card 구조, metadata 스펙, 오류 처리 방식, 요청/응답 포맷이 조금만 달라도 타사 Agent와의 상호운용성이 깨진다.
- 특히 기업별 도메인 Agent는 고유 기능·권한·보안 정책을 갖기 때문에 완전한 호환성을 유지하기 어렵다.
- 장기적으로 A2A는 “HTTP API의 표준화 과정”과 유사한 문제를 겪을 것이며, 아직 초창기 특성으로 인해 표준이 굳지 않은 상태다.

### 4. 책임성(Accountability & Traceability)

- 여러 Agent가 호출되며 의사결정을 공동으로 수행하는 구조에서는 “최종 판단이 누구의 책임인가?”가 모호하다.
- 예: A→B→C로 이어진 호출에서 잘못된 판단이 나오면 책임 주체를 특정하기 어렵고, 검증·감사(Audit)가 복잡해진다.
- 기업 내부 규제, 컴플라이언스, 품질 관리 체계에서는 이러한 책임 불분명 문제를 용납하지 않는다.
- 호출 체인의 trace log 및 deterministic execution 보장이 필수지만, A2A 표준에는 아직 강제된 audit spec이 없다.

### 5. 비용(Cost & Scalability)

- 에이전트들이 서로 호출을 많이 하면 할수록 LLM Token 사용량·API 호출 비용·모델 실행 리소스가 빠르게 증가한다.
- 특히 대형 LLM 기반 Agent 조합일수록 비용 폭발이 쉽게 발생하고 실시간 서비스는 버티기 어려워질 수 있다.

### 6. 품질 편차(Quality Variance)

- 모든 Agent가 동일한 모델·동일한 지식 수준을 갖는 것이 아니므로, A Agent의 판단 품질과 B Agent의 판단 품질이 다를 수 있다.
- 상호 호출 과정에서 오히려 품질이 떨어지는 “Quality Degradation Chain”이 발생할 수 있다.
- 각 Agent가 서로 다른 벤더·모델·파인튜닝 스펙을 사용할 경우, 예측 불가능한 동작이 늘어난다.



# AI 융합서비스 개발팀 관점에서 해석한 MCP × A2A 시장

##1. 소규모 연구팀에게 장벽이 낮아진 환경

기존 서비스 구축 방식은 작은 연구팀에게 사실상 장벽이었다. 백엔드 인프라, 인증·권한 관리, 모듈화, 배포·운영까지 모두 감당해야 했고,
 결국 “전체 플랫폼을 직접 만드는 팀”만 시장에 뛰어들 수 있었다.

하지만 MCP 등장 이후 상황이 달라졌다.**규모 큰 플랫폼 없이도, 도구(API) 하나를 MCP 규격만 지켜서 만들면
AI 모델이 스스로 그 도구를 연결하고 활용하는 생태계가 열렸다.**

즉,  대규모 인프라를 깔지 않아도 “잘 만든 기능 하나”로 시장 참여가 가능해졌다. 소규모 연구팀에게는 이 변화가 부담이 아니라 **기회**다.

## 2. **A2A 시대 — 독립 Agent 유닛이 인정받는 구조**

A2A(Agent-to-Agent) 체계에서는 각 Agent가 특정 역할을 맡아 협업하고, Router가 이를 조율해 하나의 완성된 서비스를 만들어낸다. 이 환경에서는 기능 단위 Agent가 그대로 “서비스 자산”이 된다. **Agent 하나만 잘 만들어도 충분히 독립적인 경쟁력이 된다.** 이는 소규모 연구팀에게 유리한 조건이다.

큰 플랫폼을 만들 필요 없다. 잘 만든 MCP , 잘 만든 Agent 면 지금의 A2A 생태계에서 충분히 영향력을 가질 수 있다. 연구팀에게 좋은 기회다.

## 3. A2A 기술을 둘러싼 플랫폼 경쟁 구도 변화

A2A가 등장하면서 주요 기업들이 각자 방식으로 Agent 생태계를 만들고 있다.

- Google: Vertex 기반 A2A(Agent Card, Registry 등)
- OpenAI: MCP 중심 도구 생태계
- Meta: 오픈 소스 Agent 플랫폼 전략
- Microsoft: Copilot + Plugin 조합

여러 기업이 “Agent 기반 서비스 구조”를 표준으로 삼으려 하고 있고, 그 과정에서 작은 기능 단위 Agent 수요는 더 늘어날 가능성이 높다.

## 4. Agent 개발 생태계의 확장 가능성

A2A가 확산되면 플랫폼별로 Agent를 등록·공유·판매할 수 있는 구조(일종의 Agent Marketplace)가 생길 가능성이 크다. 단일 Agent를 잘 만들면 외부에서도 재사용될 수 있기 때문에, 소규모 연구팀이 투자 대비 효율을 만들기 쉬워진다. 기능 단위로 참여해도 충분히 의미 있는 역할을 할 수 있는 구조다. **앱스토어가 등장하자 앱 개발자가 폭팔적으로 늘어난 것처럼, MCP와 A2A 시대에는 “Agent 개발자”가 폭발적으로 늘어날 것이다.**

## 5. 정리

MCP는 도구 연결을 단순화했고, A2A는 Agent 자체를 독립적인 구성 요소로 만들었다. 이 두 흐름이 결합하면 규모가 작은 팀도 기능 단위로 서비스에 참여할 수 있게 된다. **과거처럼 플랫폼 전체를 만들 필요가 없기 때문에, 소규모 연구팀 입장에서는 부담이 줄고 진입 가능성은 커진다.**



## 현재 존재하는 주요 Agent 마켓플레이스 / 디렉토리

지금은 B2B Agent Market플레이스가 다수지만, B2C Agent Market플레이스가 나올수도 있다.

| 플랫폼/서비스명                                              | 특징 / 비고                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **AI Agent Store**                                           | 오픈형 디렉토리/마켓플레이스. “Ready-to-use AI agents”, agent 빌더 프레임워크, agent 목록 + 가격 정보 제공. 누구나 에이전트 올리고 배포 가능. [AI Agent Store](https://aiagentstore.ai/?utm_source=chatgpt.com) |
| **AWS Marketplace** (2025년 기준 “AI agents and tools” 항목 포함) | 기존 도구/소프트웨어 마켓플레이스였지만 최근 “SaaS API-based AI agents or tools” 등록 가능하게 됨. 기업용 agent 배포 + 판매 가능. [AWS Documentation+2Amazon Web Services, Inc.+2](https://docs.aws.amazon.com/marketplace/latest/userguide/listing-saas-ai-agents.html?utm_source=chatgpt.com) |
| **Oracle AI Agent Marketplace**                              | 2025년 10월에 정식 런칭. 기업용 ERP/CRM 시스템용 agent 템플릿을 제공. 외부 ISV/시스템통합업체가 만든 agent를 공식 스토어를 통해 배포. [Oracle+2Oracle+2](https://www.oracle.com/in/news/announcement/ai-world-oracle-launches-fusion-applications-ai-agent-marketplace-to-accelerate-enterprise-ai-adoption-2025-10-15/?utm_source=chatgpt.com) |
| **Kore.ai Agent Marketplace**                                | 이미 agent 템플릿 + 워크플로우 자동화용 agent들을 제공하는 마켓. 엔터프라이즈 워크플로우, 고객지원, HR, 직원 self-service 등 다양한 분야 커버. [kore.ai](https://www.kore.ai/ai-marketplace?utm_source=chatgpt.com) |
| **AI Agents Directory**                                      | “1.3k+ AI Agents” 수록된 디렉토리 / 마켓. 기능, 가격, 배포 옵션 비교 가능. 다양한 agent 솔루션을 한데 모아둔 곳. [aiagentsdirectory.com](https://aiagentsdirectory.com/?utm_source=chatgpt.com) |



### Reference

[URACLE](https://uracle.blog/2025/07/25/agent-to-agenta2a-ai-%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8%EB%93%A4%EC%9D%B4-%EB%93%9C%EB%94%94%EC%96%B4-%EB%8C%80%ED%99%94%ED%95%98%EA%B8%B0-%EC%8B%9C%EC%9E%91%ED%96%88%EB%8B%A4/) Agent to Agent : AI 에이전트들이 드디어 대화하기 시작했다. (2025.07.25)

[A2A Protocol](https://a2a-protocol.org/latest/) What is A2A Protocol? (게시일 없음)

[Google for Developers](https://developers.googleblog.com/ko/a2a-a-new-era-of-agent-interoperability/) Agent2Agent(A2A) 프로토콜 발표 (2025.04.09)

[PyTorch](https://discuss.pytorch.kr/t/google-ai-a2a-agent-to-agent/6761) Google, AI 에이전트들간의 협업을 위한 A2A(Agent-to-Agent) 프로토콜 공개 (2025.04.11)

[kakao ventures](https://www.kakao.vc/blog/mcp-to-a2a) MCP에 이어 A2A, 이제 AI도 조립해서 쓴다 (2025.05.28)

[Codelabs](https://codelabs.developers.google.com/intro-a2a-purchasing-concierge?hl=ko#0) Agent2Agent(A2A) 프로토콜 시작하기: Cloud Run 및 Agent Engine에서 구매 컨시어지와 원격 판매자 에이전트 상호작용 예시 (2025.09.27)

[IBM](https://www.ibm.com/kr-ko/think/topics/agent2agent-protocol) A2A 프로토콜(Agent2Agent)이란? (게시일 없음)

[Logto](https://blog.logto.io/ko/a2a-mcp) A2A vs MCP: 새로운 에이전트 생태계를 위한 두개의 보완적 프로토콜 (2025.04.11)

[Firstcoding](https://firstcoding.net/133#google_vignette) Google Agent to Agent(A2A)를 이용한 Agent 구현 (2025.05.09)

[DEVOCEAN](https://devocean.sk.com/blog/techBoardDetail.do?ID=167385&boardType=techBlog) A2A x MCP: 도구와 협업을 모두 잇는 AI 연결고리 (2025.04.16)



* 부록

### Specification Structure[¶](https://a2a-protocol.org/latest/specification/#13-specification-structure)

This specification is organized into three distinct layers that work together to provide a complete protocol definition:

<img src="C:\Users\repli\Desktop\A2A\resource\a2a layer.PNG" alt="a2a layer" style="zoom:67%;" />

**Layer 1: Canonical Data Model** defines the core data structures and message formats that all A2A implementations must understand. These are protocol agnostic definitions expressed as Protocol Buffer messages.

**Layer 2: Abstract Operations** describes the fundamental capabilities and behaviors that A2A agents must support, independent of how they are exposed over specific protocols.

**Layer 3: Protocol Bindings** provides concrete mappings of the abstract operations and data structures to specific protocol bindings (JSON-RPC, gRPC, HTTP/REST), including method names, endpoint patterns, and protocol-specific behaviors.

This layered approach ensures that:

- Core semantics remain consistent across all protocol bindings
- New protocol bindings can be added without changing the fundamental data model
- Developers can reason about A2A operations independently of binding concerns
- Interoperability is maintained through shared understanding of the canonical data model
