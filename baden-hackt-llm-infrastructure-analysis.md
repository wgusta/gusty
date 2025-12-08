# Baden Hackt: Umfassende LLM & Large Dataset Infrastructure Analyse

**Erstellt:** 2025-12-03
**Zweck:** Technische Grundlage für Diskussion mit Güney Usta
**Fokus:** Open Source, Large Datasets, praktische Hackathon-Implementierung

---

## Executive Summary

Dieses Dokument analysiert die **realistische, praktische Infrastruktur** für einen modernen AI-Hackathon mit Fokus auf:
- **Large Dataset Verarbeitung** (GB bis TB-Bereich)
- **LLM Integration** über RAG (Retrieval-Augmented Generation)
- **Open Source Lösungen** mit Docker/Kubernetes
- **Hybrid Cloud + Local Setup**
- **Kosteneffizienz** und Skalierbarkeit

**Kontext:** Alternative zu Güney Ustas Quantum Computing Vorschlag mit **praktischem, sofort nutzbarem Setup**.

---

## Teil 1: Das Problem: Grosse Datenmengen + LLMs

### Warum reichen Standard LLM APIs nicht?

**Problem: Context Window Limitations**
```
GPT-4o: 128K Tokens = ~400 Seiten Text = ~100 MB
Claude Sonnet 4.5: 200K Tokens = ~600 Seiten = ~150 MB

Typische Hackathon Datasets:
- Finanz-Quartalsberichte: 500 MB - 2 GB
- Medizinische Papers: 1 GB - 5 GB
- Legal Documents: 2 GB - 10 GB
- Unternehmensdaten: 5 GB - 100+ GB
```

**Lösung: RAG (Retrieval-Augmented Generation)**
- Dokumente in Chunks aufteilen
- Semantische Suche über Vector Database
- Nur relevante Chunks an LLM senden
- Ermöglicht TB-Scale Datenverarbeitung

---

## Teil 2: Open Source LLM Hosting Stack

### 2.1 LLM Inference Engines

#### **vLLM (Empfehlung für Production)**

**Features:**
- **PagedAttention:** Bis zu 24x höherer Throughput als TGI bei hoher Concurrency
- **Multi-GPU Support:** Tensor Parallelism für grosse Modelle
- **OpenAI-kompatible API:** Drop-in replacement
- **Continuous Batching:** Optimale GPU-Auslastung

**Hardware Support:** NVIDIA, AMD, Intel, TPUs

**Docker Deployment:**
```bash
docker run --gpus all \
    -v ~/.cache/huggingface:/root/.cache/huggingface \
    -p 8000:8000 \
    --ipc=host \
    vllm/vllm-openai:latest \
    --model meta-llama/Llama-3.1-70B-Instruct \
    --tensor-parallel-size 2
```

**Performance Benchmarks:**
- RTX 4090 (24GB): ~30-50 tokens/s für 70B Modelle (quantisiert)
- A100 (40GB): ~60-80 tokens/s für 70B Modelle
- H100 (80GB): ~120-150 tokens/s für 70B Modelle

**Kosten vs. Cloud:**
```
Cloud (OpenAI GPT-4o): $5/M input + $15/M output tokens
Self-hosted (vLLM + Llama 3.1 70B): Hardware-Kosten only

Break-even bei ~500M-1B Tokens (je nach Hardware)
```

#### **TGI (Text Generation Inference)**

**Features:**
- **HuggingFace Integration:** Nahtlos mit HF Hub
- **Multi-Backend Support:** TensorRT-LLM, vLLM Backends
- **Niedrigere Tail Latencies:** Besser für interaktive Single-User Szenarien

**2025 Update:** TGI integriert vLLM als Backend in Q1 '25.

**Best Use Case:** Latency-sensitive Anwendungen mit moderater Concurrency

#### **Ollama (Empfehlung für Hackathon Workstations)**

**Warum Ollama?**
✅ **Ein-Kommando Installation:** `curl -fsSL https://ollama.com/install.sh | sh`
✅ **Model Library:** 100+ vortrainierte Modelle
✅ **OpenAI-kompatible API:** Port 11434
✅ **Automatisches Quantisierung:** Q4, Q5, Q8 Varianten

**Setup für Baden Hackt Workstations:**
```bash
# Installation
curl -fsSL https://ollama.com/install.sh | sh

# Models pre-downloaden
ollama pull llama3.1:70b-instruct-q4_K_M  # 40GB
ollama pull qwen2.5:72b-q4_K_M             # 42GB
ollama pull deepseek-coder-v2:16b          # 9.4GB
ollama pull mistral:7b-instruct-v0.3       # 4.1GB

# API Server starten
ollama serve  # OpenAI-compatible API auf localhost:11434
```

**Nutzung mit Standard-Libraries:**
```python
from openai import OpenAI

# Einfach URL ändern, Rest bleibt gleich!
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Required but unused
)

response = client.chat.completions.create(
    model="llama3.1:70b-instruct-q4_K_M",
    messages=[{"role": "user", "content": "Explain RAG"}]
)
```

---

### 2.2 Embedding Models: Open Source Alternativen

#### **Kosten-Vergleich (per 1M Tokens)**

| Provider | Model | Cost | Performance | Context |
|----------|-------|------|-------------|---------|
| **OpenAI** | text-embedding-3-small | $0.02 | Baseline | 8K |
| **OpenAI** | text-embedding-3-large | $0.13 | 80.5% Accuracy | 8K |
| **Voyage** | voyage-3 | $0.06 | 9.74% better than OpenAI large | 32K |
| **Voyage** | voyage-3-lite | $0.02 | 66.1% Accuracy | 32K |
| **Cohere** | embed-v4 | $0.12 | Lower than comparable | 512 |
| **BGE-M3** | Self-hosted | $0.00 | 71.5% (comparable) | 8K |
| **Instructor-XL** | Self-hosted | $0.00 | Instruction-aware | 512 |

#### **BGE-M3: Die Open Source Champion**

**Why BGE-M3?**
- **Multi-Functional:** Dense, Multi-Vector, Sparse Retrieval
- **Multi-Lingual:** 100+ Sprachen
- **Multi-Granularity:** 8192 Token Context
- **MIT License:** Kommerziell nutzbar
- **Performance:** Übertrifft OpenAI in vielen Benchmarks

**Deployment mit TEI (Text Embeddings Inference):**
```bash
docker run -p 8080:80 \
    --gpus all \
    --pull always \
    ghcr.io/huggingface/text-embeddings-inference:1.8 \
    --model-id BAAI/bge-m3
```

**Cost Analysis für 100 Teilnehmer:**
```
Annahme: 50 GB Dokumente pro Challenge
50 GB = ~12.5M Tokens

Embeddings Kosten:
- OpenAI (3-small): 12.5M × $0.02 = $250
- Voyage-3-lite: 12.5M × $0.02 = $250
- BGE-M3 (self-hosted): $0 (nur GPU-Zeit: ~2h auf RTX 4090 = $0.68)

Für 5 Challenges: BGE-M3 spart $1,250 vs. APIs
```

#### **Instructor-XL: Task-Specific Embeddings**

**Unique Feature:** Instruction-aware embeddings
```python
from InstructorEmbedding import INSTRUCTOR

model = INSTRUCTOR('hkunlp/instructor-xl')

# Task-spezifische Embeddings
embedding = model.encode([
    ["Represent the financial document for retrieval: ",
     "Q4 2024 revenue increased by 23%..."]
])
```

**Use Case:** Wenn Dokumente unterschiedliche "Aufgaben" haben (Suche, Klassifikation, Clustering).

---

### 2.3 Vector Databases: Vergleich

#### **Performance Benchmarks (1M Vectors, 768 Dim)**

| Database | Insertions/s | Queries/s | GitHub Stars | Lizenz | Best For |
|----------|-------------|-----------|--------------|--------|----------|
| **Qdrant** | 45,000 | 4,500 | 9,000+ | Apache 2.0 | Performance |
| **Weaviate** | 35,000 | 3,500 | 8,000+ | BSD-3 | Integration Flexibility |
| **ChromaDB** | 25,000 | 2,000 | 6,000+ | Apache 2.0 | Ease of Use |

#### **Qdrant: Die Performance-Wahl**

**Features:**
- **Native Filtering:** Kombiniert Vector Search + Metadata Filtering
- **Quantization:** 75% Memory-Reduktion ohne Accuracy-Verlust
- **Distributed Mode:** Horizontal Scaling
- **HNSW Algorithm:** State-of-the-art Similarity Search

**Docker Deployment:**
```bash
docker run -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage:z \
    qdrant/qdrant
```

**Cost Analysis: Vector Storage**
```
10M Vectors (1536 Dimensions = BGE-M3):

Option 1: AWS S3 Vectors (Juli 2025 Launch)
- Storage: 60 GB × $0.023/GB/month = $1.38/month
- Queries: 1M × $0.004/1K = $4/month
- Total: $5.38/month

Option 2: Pinecone Serverless
- Storage: 60 GB × $0.33/GB/month = $19.80/month
- Read Units: 1M × $8.25/M = $8.25/month
- Total: $28.05/month

Option 3: Qdrant Self-Hosted (RTX 4090 Workstation)
- Storage: 60 GB SSD = ~$0.05/month (amortisiert)
- Compute: Always-on = already paid
- Total: ~$0/month (marginal costs)

Ersparnis Self-Hosted: $336/Jahr vs. S3, $1,006/Jahr vs. Pinecone
```

#### **ChromaDB: Die Entwickler-Freundliche**

**Perfect für Hackathons:**
```python
import chromadb

# In-Memory für schnelles Prototyping
client = chromadb.Client()

# Oder persistent
client = chromadb.PersistentClient(path="/path/to/data")

collection = client.create_collection(name="financial_docs")

# Super einfaches API
collection.add(
    documents=["Q4 revenue up 23%", "New product launch in Q1"],
    metadatas=[{"quarter": "Q4", "year": 2024},
               {"quarter": "Q1", "year": 2025}],
    ids=["doc1", "doc2"]
)

results = collection.query(
    query_texts=["revenue growth"],
    n_results=5
)
```

**Use Case:** Perfekt für <1M Vectors, schnelles Prototyping.

---

## Teil 3: RAG Pipeline: Complete Stack

### 3.1 Data Ingestion: Unstructured.io

**The Problem:** PDFs, DOCX, HTML, etc. sind "unstructured".

**Unstructured.io Lösung:**
- **25+ Dokument-Typen:** PDF, DOCX, HTML, CSV, Images, etc.
- **OCR Support:** Für gescannte Dokumente
- **Table Extraction:** Strukturierte Tabellen aus PDFs
- **Partition Strategies:** Auto, Fast, Hi-Res, OCR-only

**Docker Deployment (Open Source):**
```bash
docker run -p 8000:8000 \
    downloads.unstructured.io/unstructured-io/unstructured-api:latest \
    --port 8000 --host 0.0.0.0
```

**Usage:**
```python
from unstructured_client import UnstructuredClient
from unstructured_client.models import shared

client = UnstructuredClient(api_key_auth="YOUR_API_KEY")

with open("financial_report.pdf", "rb") as f:
    files = shared.Files(
        content=f.read(),
        file_name="financial_report.pdf",
    )

req = shared.PartitionParameters(
    files=files,
    strategy="hi_res",  # OCR + ML models
    extract_image_block_types=["Image", "Table"],
)

resp = client.general.partition(req)
elements = resp.elements  # Structured data!
```

**Cost Comparison:**
```
Self-Hosted (Docker): $0 (GPU-Zeit für OCR)
API (unstructured.io): $1 per 1,000 pages
AWS Textract: $1.50 per 1,000 pages

Für 100,000 Seiten: Ersparnis von $100-150 mit Self-Hosted
```

### 3.2 Chunking Strategies: Optimale Granularität

**NVIDIA Benchmarks (2024):**
| Strategy | Accuracy | Best Use Case |
|----------|----------|---------------|
| **Page-Level** | 64.8% | Dokumente mit natürlichen Seiten (PDFs) |
| **Section-Level** | 62.3% | Strukturierte Dokumente (Reports) |
| **Semantic** | 91.9% | Gemischte Inhalte |
| **Fixed 512 Tokens** | 85.4-89.5% | Baseline, universell |

**Best Practice Empfehlung:**
```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,           # Baseline
    chunk_overlap=100,        # 20% overlap
    separators=["\n\n", "\n", ". ", " ", ""],
    length_function=len,
)

chunks = splitter.split_documents(documents)
```

**Query-Type Optimization:**
```
Factoid Queries (kurze Antworten): 256-512 Tokens
Analytical Queries (lange Analysen): 1024+ Tokens
Financial Data: 512-1024 Tokens (Tables + Context)
Legal Documents: 1024-2048 Tokens (Präzedenzfall-Context)
```

### 3.3 LangChain vs. LlamaIndex: Framework-Wahl

#### **LangChain: Workflow Orchestration**

**Strengths:**
- Multi-Step AI Workflows
- Agent-Systeme
- Breite Integration (100+ Tools)
- Etabliertes Ecosystem

**Weaknesses:**
- Komplexere Datenindexierung
- Steile Lernkurve für RAG

**Best für:** Multi-Agent Systeme, komplexe Workflows

#### **LlamaIndex: Data-First RAG**

**Strengths:**
- **+35% Retrieval Accuracy** (2025 vs. 2024)
- Document-heavy Applications
- LlamaHub: 100+ Data Connectors
- User-Friendly Data Ingestion

**Weaknesses:**
- Weniger flexibel für Non-RAG Tasks

**Best für:** Reine RAG-Anwendungen, Document Q&A

**Hackathon-Empfehlung:**
```
Einsteiger-Teams (60%): LlamaIndex
  → Schneller Start, weniger Komplexität

Agent-Teams (40%): LangChain + LangGraph
  → Multi-Agent Systeme, komplexe Workflows
```

### 3.4 Complete RAG Docker Stack

**docker-compose.yml für Baden Hackt:**
```yaml
version: '3.8'

services:
  # Vector Database
  qdrant:
    image: qdrant/qdrant:v1.12.1
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - ./qdrant_storage:/qdrant/storage
    environment:
      - QDRANT__SERVICE__GRPC_PORT=6334

  # LLM Inference (Local)
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ./ollama_models:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]

  # Embedding Service
  text-embeddings-inference:
    image: ghcr.io/huggingface/text-embeddings-inference:1.8
    ports:
      - "8080:80"
    volumes:
      - ./tei_cache:/data
    command: --model-id BAAI/bge-m3
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  # Document Processing
  unstructured-api:
    image: downloads.unstructured.io/unstructured-io/unstructured-api:latest
    ports:
      - "8000:8000"
    command: --port 8000 --host 0.0.0.0

  # RAG Application (FastAPI)
  rag-api:
    build: ./rag-service
    ports:
      - "8001:8001"
    depends_on:
      - qdrant
      - ollama
      - text-embeddings-inference
    environment:
      - QDRANT_URL=http://qdrant:6333
      - OLLAMA_URL=http://ollama:11434
      - EMBEDDING_URL=http://text-embeddings-inference:80
      - UNSTRUCTURED_URL=http://unstructured-api:8000

  # Open WebUI (User Interface)
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    volumes:
      - ./open-webui:/app/backend/data
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    depends_on:
      - ollama

networks:
  default:
    name: rag-network
```

**Deployment:**
```bash
# Start entire stack
docker compose up -d

# Pre-load models
docker exec -it ollama ollama pull llama3.1:70b-instruct-q4_K_M

# Check logs
docker compose logs -f rag-api
```

**Access Points:**
- Ollama API: `http://localhost:11434/v1`
- Qdrant Dashboard: `http://localhost:6333/dashboard`
- RAG API: `http://localhost:8001/docs`
- Open WebUI: `http://localhost:3000`

---

## Teil 4: MCP (Model Context Protocol) Integration

### Was ist MCP?

**Model Context Protocol** (Anthropic, Nov 2024):
- Standardisiertes Protokoll für LLM <-> Tool/Data Kommunikation
- Ermöglicht LLMs Zugriff auf:
  - Dateisysteme
  - Datenbanken
  - APIs
  - Custom Tools

**Warum relevant für Hackathon?**
- **Agents mit echten Daten** verbinden
- **Sicherer Zugriff** auf geschützte Ressourcen
- **Standardisiert:** Funktioniert mit Claude, anderen LLMs

### MCP Server: Docker Deployment

#### **Filesystem MCP Server**
```dockerfile
# Dockerfile
FROM node:20-slim

WORKDIR /app

RUN npm install -g @modelcontextprotocol/server-filesystem

EXPOSE 3000

CMD ["mcp-server-filesystem", "/data"]
```

**docker-compose.yml Integration:**
```yaml
mcp-filesystem:
  build: ./mcp-filesystem
  volumes:
    - ./hackathon_data:/data:ro  # Read-only access
  ports:
    - "3001:3000"
```

#### **PostgreSQL MCP Server**
```yaml
mcp-postgres:
  image: node:20-slim
  command: >
    sh -c "npm install -g @modelcontextprotocol/server-postgres &&
           mcp-server-postgres postgresql://user:pass@postgres:5432/hackathon"
  depends_on:
    - postgres
  ports:
    - "3002:3000"

postgres:
  image: postgres:16
  environment:
    POSTGRES_DB: hackathon
    POSTGRES_USER: user
    POSTGRES_PASSWORD: pass
  volumes:
    - ./postgres_data:/var/lib/postgresql/data
```

### Cloud MCP Deployment: Cloudflare Workers

**Warum Cloudflare?**
✅ **Kostenlos/Günstig:** $5-25/Monat
✅ **Native MCP Support:** Agents SDK
✅ **Durable Objects:** Stateful MCP Server
✅ **Edge Network:** Schnellste Ladezeiten

**Alternative: AWS ($194/Monat)**
- Production-Ready mit Cognito OAuth
- MCP Spec 2025-06-18 compliant
- Für Enterprise, Overkill für Hackathon

**Empfehlung für Baden Hackt: Cloudflare**

---

## Teil 5: LLM Gateway & Routing

### Problem: Multi-Provider Management

**Herausforderungen:**
- Verschiedene API-Formate (OpenAI, Anthropic, Cohere, etc.)
- Rate Limits & Fallbacks
- Cost Optimization (günstigster Provider)
- Load Balancing

### Lösung 1: LiteLLM (Open Source)

**Features:**
- **Unified API:** OpenAI-Format für 100+ Providers
- **Load Balancing:** Round-Robin, Weighted
- **Fallbacks:** Auto-switch bei Errors
- **Cost Tracking:** Per-Request Kosten
- **Self-Hosted:** Docker/Kubernetes

**Docker Deployment:**
```yaml
litellm:
  image: ghcr.io/berriai/litellm:main-latest
  ports:
    - "4000:4000"
  environment:
    - OPENAI_API_KEY=${OPENAI_API_KEY}
    - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    - COHERE_API_KEY=${COHERE_API_KEY}
  volumes:
    - ./litellm_config.yaml:/app/config.yaml
  command: --config /app/config.yaml
```

**litellm_config.yaml:**
```yaml
model_list:
  - model_name: gpt-4o-mini
    litellm_params:
      model: openai/gpt-4o-mini
      api_key: ${OPENAI_API_KEY}

  - model_name: claude-sonnet
    litellm_params:
      model: anthropic/claude-sonnet-4-5
      api_key: ${ANTHROPIC_API_KEY}

  - model_name: local-llama
    litellm_params:
      model: ollama/llama3.1:70b-instruct-q4_K_M
      api_base: http://ollama:11434

router_settings:
  routing_strategy: cost-based  # or simple-shuffle, latency-based
  enable_fallbacks: true
  fallback_models: ["gpt-4o-mini", "claude-sonnet"]
```

**Usage (identisch zu OpenAI):**
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:4000",
    api_key="sk-1234"  # LiteLLM API Key
)

# Automatisches Routing zum günstigsten/schnellsten Modell
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Explain RAG"}]
)
```

### Lösung 2: OpenRouter (Hosted Service)

**Pricing Model:**
- **No Markup Claim:** OpenRouter behauptet 0% Markup
- **Disputed:** Alternativen behaupten 5% Markup
- **Reality Check:** ~3-5% de facto Markup

**Cost Comparison (per 1M Tokens):**
```
Direct OpenAI GPT-4o: $5.00 input / $15.00 output
Via OpenRouter: $5.00 input / $15.00 output (gleich)

Direct Claude Sonnet 4.5: $3.00 / $15.00
Via OpenRouter: $3.00 / $15.00 (gleich)

→ Kein Markup sichtbar, aber Routing-Gebühren?
```

**Features:**
- **Kein Setup:** Sofort nutzbar
- **Auto-Routing:** Günstigster verfügbarer Provider
- **Fallbacks:** Bei Downtime/Rate Limits
- **100+ Modelle:** Ein API Key für alles

**Use Case für Hackathon:**
- Quick Start ohne Infrastructure
- Gute für Cloud-Only Teams
- **Nachteil:** Keine Kontrolle, potenzielle Vendor Lock-in

**Empfehlung:** LiteLLM (Self-Hosted) > OpenRouter

---

## Teil 6: Large Dataset Use Cases (Hackathon-Ready)

### 6.1 Financial Analysis Challenge

**Dataset:** Öffentliche Quartalsberichte (10-K, 10-Q)
- **Grösse:** 2-5 GB (500-1000 Unternehmen)
- **Format:** PDF, HTML
- **Challenge:** "Find revenue trends, predict future performance"

**RAG Architecture:**
```
1. Data Ingestion: Unstructured.io → Extract Tables + Text
2. Chunking: 512 Tokens (Financial Context)
3. Embeddings: BGE-M3 (Financial-Domain)
4. Vector DB: Qdrant (Fast Filtering by Company, Quarter)
5. LLM: Llama 3.1 70B oder GPT-4o
```

**Example Query:**
```
User: "Compare Tesla's revenue growth vs. competitors in Q3 2024"

RAG Process:
1. Embed Query → BGE-M3
2. Vector Search → Qdrant (top 10 chunks: Tesla Q3, GM Q3, Ford Q3)
3. Retrieve Original Chunks (512 tokens each = 5120 tokens total)
4. Prompt LLM: "Based on these financial reports: [chunks], compare..."
5. LLM Response: Structured comparison with source citations
```

**Real Example (Kaggle Hackathon):**
- **Challenge:** Financial RAG System
- **Dataset:** JSONL files with quarterly reports, balance sheets
- **Solution:** FAISS for vector search, OpenAI embeddings
- **Result:** Accurate retrieval from large corpus

### 6.2 Legal Document Analysis

**Dataset:** EU Regulations, Swiss Federal Laws
- **Grösse:** 5-10 GB
- **Format:** PDF, XML
- **Challenge:** "Find relevant laws for specific case"

**Special Requirements:**
- **Citation Accuracy:** Must cite exact paragraphs
- **Precedent Search:** Find similar past rulings
- **Multi-Lingual:** DE, FR, IT

**RAG Optimization:**
```python
# Legal-Specific Chunking
from langchain.text_splitter import RecursiveCharacterTextSplitter

legal_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1024,  # Longer for legal context
    chunk_overlap=200,  # 20% overlap to keep citations
    separators=["\n\n## ", "\n\n### ", "\n\n", "\n", ". "],
)

# Metadata Preservation
for chunk in chunks:
    chunk.metadata = {
        "source": "EU Regulation 2024/123",
        "article": "Article 5, Paragraph 3",
        "language": "DE",
        "effective_date": "2024-01-01"
    }
```

**Vector Search with Filters:**
```python
results = qdrant_client.search(
    collection_name="legal_docs",
    query_vector=embed("data protection requirements"),
    query_filter=models.Filter(
        must=[
            models.FieldCondition(
                key="language",
                match=models.MatchValue(value="DE"),
            ),
            models.FieldCondition(
                key="effective_date",
                range=models.DatetimeRange(
                    gte="2020-01-01",
                )
            )
        ]
    ),
    limit=10
)
```

### 6.3 Medical Literature Review

**Dataset:** PubMed Papers, Clinical Trials
- **Grösse:** 10-50 GB
- **Format:** PDF, XML (PubMed Format)
- **Challenge:** "Summarize latest treatments for condition X"

**Technical Challenges:**
- **Domain-Specific Language:** Medical terminology
- **Citation Networks:** Papers cite each other
- **Temporal Relevance:** Newer studies supersede old

**Solution: Temporal-Aware RAG**
```python
# Boost recent papers
def calculate_score(vector_score, publication_year):
    recency_boost = 1 + (publication_year - 2020) * 0.1
    return vector_score * recency_boost

# Citation-Aware Ranking
def rerank_by_citations(results):
    return sorted(results,
                  key=lambda x: x.citations_count,
                  reverse=True)
```

**Real-World Example: IBM Watson Health**
- **Dataset:** EHRs + Medical Literature
- **Use Case:** Cancer diagnosis + treatment recommendations
- **Tech:** RAG over terabytes of medical data

---

## Teil 7: Kosten-Analyse für Baden Hackt

### Szenario A: Cloud-Only (Kein Hardware-Kauf)

**Setup:**
```
100 Teilnehmer, 48h Hackathon
5 Challenge-Tracks mit je 10 GB Daten
```

#### **Data Ingestion (einmalig)**
```
Unstructured.io API: 50,000 Seiten × $1/1000 = $50
oder Self-Hosted Docker: $0 (GPU-Zeit: ~5h × $0.34 = $1.70)
```

#### **Embeddings (einmalig)**
```
50 GB Dokumente = ~12.5M Tokens per Challenge × 5 = 62.5M Tokens

Option A: OpenAI text-embedding-3-small
62.5M × $0.02/M = $1,250

Option B: Voyage-3-lite
62.5M × $0.02/M = $1,250

Option C: TEI + BGE-M3 (Self-Hosted)
GPU-Zeit: ~10h × $0.34/h (RunPod RTX 4090) = $3.40
```

#### **Vector Database**
```
Option A: Pinecone Serverless
Storage: 300 GB (5 challenges × 60GB) × $0.33 = $99/month
Queries: 10M × $8.25/M = $82.50
Total: $181.50 (nur Hackathon-Monat)

Option B: Qdrant Cloud
Ähnlich wie Pinecone: ~$150-200/month

Option C: Qdrant Self-Hosted (Docker auf Cloud GPU)
RunPod RTX 4090: 48h × $0.34/h = $16.32
Storage: Included in GPU instance
```

#### **LLM API Calls**
```
Annahme: Durchschnittlich 5M Tokens pro Team (100 Teams = 500M total)

Option A: GPT-4o Mini (günstig)
Input: 300M × $0.15/M = $45
Output: 200M × $0.60/M = $120
Total: $165

Option B: Mix (GPT-4o Mini + Claude Haiku)
GPT-4o Mini: $100
Claude Haiku: $100
Total: $200

Option C: Self-Hosted Llama 3.1 70B (vLLM)
RunPod A100: 48h × $1.74/h = $83.52
oder
RTX 4090 Workstation: $0 (hardware already owned)
```

**Total Cloud-Only:**
```
Best Case (Self-Hosted Everything auf RunPod):
- Data Ingestion: $1.70
- Embeddings: $3.40
- Vector DB: $16.32
- LLM Inference: $83.52
Total: ~$105

Standard Case (Mix):
- Data Ingestion: $50
- Embeddings: $1,250
- Vector DB: $181.50
- LLM APIs: $200
Total: ~$1,681.50

→ Self-Hosting spart $1,576.50 (94% Ersparnis!)
```

### Szenario B: Hybrid (2 Workstations + Cloud Backup)

**Hardware Investition:**
```
2× RTX 4090 Workstations: CHF 8,000
```

**Hackathon Kosten:**
```
- Data Ingestion: $0 (local processing)
- Embeddings: $0 (local TEI)
- Vector DB: $0 (local Qdrant)
- LLM Inference: $0 (local Ollama)
- Cloud Backup (APIs für Overflow): $200

Total per Hackathon: $200
```

**ROI Berechnung:**
```
Break-Even: CHF 8,000 / ($1,681.50 - $200) = 5.4 Hackathons

Bei 2 Hackathons/Jahr: ROI in 2.7 Jahren
Bei 4 Hackathons/Jahr: ROI in 1.35 Jahren

Plus: Workstations nutzbar für:
- Weitere Events
- Community Workshops
- Startup-Support
- Demos
```

### Szenario C: Full Local (3 Workstations, No Cloud)

**Hardware:**
```
3× RTX 4090 Workstations: CHF 12,000
```

**Hackathon Kosten:**
```
- Alles lokal: $0
- Strom: ~50 kWh × CHF 0.20 = CHF 10

Total: CHF 10 per Hackathon
```

**Marketing-Vorteil:**
```
"Baden Hackt: Der erste Schweizer Hackathon mit eigener
GPU-Infrastruktur für datengeschützte AI-Entwicklung"

→ Einzigartig in der Region!
→ Attraktiv für Privacy-focused Projekte
→ Sponsoring-Argument (Uptown Basel!)
```

---

## Teil 8: Praktische Implementation für Baden Hackt

### Empfohlenes Setup

#### **Hardware (vor Ort):**
```
2× GPU Workstations:
- GPU: RTX 4090 (24 GB)
- CPU: Ryzen 9 7950X
- RAM: 64 GB DDR5
- Storage: 2 TB NVMe SSD
- Network: 10 Gbit Ethernet

Total: CHF 8,000-9,000
```

#### **Software Stack (Docker Compose):**
```yaml
# Siehe "Teil 3.4" für vollständigen docker-compose.yml

Services:
1. Ollama (LLM Inference)
2. TEI + BGE-M3 (Embeddings)
3. Qdrant (Vector DB)
4. Unstructured API (Document Processing)
5. LiteLLM (API Gateway)
6. Open WebUI (User Interface)
```

#### **Cloud Backup:**
```
OpenAI API: $500 Credits
Anthropic Claude: $300 Credits
RunPod GPU: $200 Credits

Total: $1,000 Backup Budget
```

### Pre-Hackathon Setup (4 Wochen)

#### **Woche 1: Hardware & Base Setup**
```bash
# Workstations aufbauen
# Ubuntu 24.04 LTS installieren
# NVIDIA Drivers installieren
sudo apt update && sudo apt install -y nvidia-driver-550
# Docker + Docker Compose installieren
curl -fsSL https://get.docker.com | sh
sudo apt install docker-compose-plugin
# NVIDIA Container Toolkit
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
    sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt update && sudo apt install -y nvidia-container-toolkit
sudo systemctl restart docker
```

#### **Woche 2: Models Pre-Download**
```bash
# Ollama Models
ollama pull llama3.1:70b-instruct-q4_K_M  # 40 GB
ollama pull qwen2.5:72b-q4_K_M            # 42 GB
ollama pull deepseek-coder-v2:16b         # 9.4 GB
ollama pull mistral:7b-instruct-v0.3      # 4.1 GB

# Embedding Models (via TEI)
docker pull ghcr.io/huggingface/text-embeddings-inference:1.8
# Model wird beim ersten Start automatisch geladen

# Test Models
ollama run llama3.1:70b-instruct-q4_K_M "Hello, test"
```

#### **Woche 3: Stack Deployment & Testing**
```bash
# Clone setup repo
git clone https://github.com/your-org/baden-hackt-rag-stack
cd baden-hackt-rag-stack

# Start stack
docker compose up -d

# Verify all services
docker compose ps
curl http://localhost:11434/v1/models  # Ollama
curl http://localhost:6333/dashboard   # Qdrant
curl http://localhost:8080/health      # TEI

# Load test data
python scripts/load_sample_data.py
```

#### **Woche 4: Documentation & Example Projects**
```bash
# Create example notebooks
jupyter notebook examples/
  - 01_basic_rag.ipynb
  - 02_financial_analysis.ipynb
  - 03_multi_agent.ipynb

# Setup guides
docs/
  - SETUP.md          # For participants
  - API_REFERENCE.md  # Endpoint documentation
  - EXAMPLES.md       # Code snippets

# Video tutorials (5-10 min each)
  - "Quick Start: Your First RAG Query"
  - "Processing Large PDFs"
  - "Building a Multi-Agent System"
```

### Hackathon-Tag Operations

#### **Tech Support Station:**
```
1 Person: API Key Distribution & Workstation Access
- Team Registration: API Keys mit Rate Limits
- Workstation Slots: 20-min Reservierung für große Jobs
- Troubleshooting: Slack Channel + vor Ort
```

#### **Monitoring Dashboard:**
```python
# Simple monitoring (Grafana + Prometheus)
# Track:
- API Request Rate (per team)
- Token Usage
- GPU Utilization
- Vector DB Query Latency
```

---

## Teil 9: Vergleich mit Güney Ustas Quantum Computing Vorschlag

### Kritische Analyse

| Kriterium | Quantum Computing | LLM/RAG Stack | Gewinner |
|-----------|-------------------|---------------|----------|
| **Praktikabilität** | ❌ 0-2 Teams können nutzen | ✅ 15-20 Teams können nutzen | **RAG** |
| **Lernkurve** | ❌ Monate bis Jahre | ✅ Stunden bis Tage | **RAG** |
| **Relevanz 2025** | ⚠️ Zukunftstechnologie | ✅ Industry Standard | **RAG** |
| **Kosten Transparenz** | ❌ Keine öffentlichen Preise | ✅ Vollständig dokumentiert | **RAG** |
| **Wiederverwendbar** | ❌ Event-Only Access | ✅ Permanente Infrastruktur | **RAG** |
| **Datenmengen** | ❌ Nicht für Big Data | ✅ Designed für TB-Scale | **RAG** |
| **Open Source** | ❌ Proprietär | ✅ 100% Open Source möglich | **RAG** |
| **Setup-Zeit** | ❌ Wochen (mit Uptown Basel) | ✅ 1-2 Tage | **RAG** |
| **Prestige/Marketing** | ✅ "Quantum Computing!" | ⚠️ Weniger spektakulär | **Quantum** |

### Kompromiss-Vorschlag: Best of Both

#### **Hauptinfrastruktur: LLM/RAG Stack** (praktisch)
- 2-3 RTX 4090 Workstations
- Full Docker Stack (Ollama, Qdrant, TEI, etc.)
- Cloud Backup APIs
- **Budget:** CHF 8,000 + $1,000

#### **Uptown Basel Connection: Quantum Demo Track** (Prestige)
- **Nicht:** Quantum für alle Teilnehmer
- **Sondern:**
  1. **Keynote:** Claudia Fricker über Quantum + AI (30 min)
  2. **Special Track:** 1-2 Quantum-fokussierte Challenges (für Experten)
  3. **Site Visit:** Gewinner-Teams besuchen Uptown Basel nach Hackathon
  4. **Sponsoring:** Uptown Basel sponsored GPU Workstations (Marketing!)

**Marketing Message:**
```
"Baden Hackt 2025: AI & Quantum Computing
─────────────────────────────────────────
Main Track: Build AI Agents mit Production-Ready Infrastructure
  → Lokale GPU Workstations (RTX 4090)
  → Large Dataset Processing (TB-Scale)
  → Open Source Stack (Ollama, Qdrant, LangChain)

Special Track: Quantum Computing Challenge
  → In Zusammenarbeit mit Uptown Basel
  → Zugang zum IonQ Forte Quantum Computer
  → Für Quantum-Experten

Powered by Uptown Basel Innovation Hub
```

---

## Teil 10: Technische Argumentation für Diskussion mit Güney

### Key Points für Gegendarstellung

#### **1. Quantum Computing: Realitätscheck**

**Argument:** "Quantum Computing ist zu spezialisiert"

**Belege:**
- Nur ~50-100 Personen in CH mit Quantum Expertise (geschätzt)
- Lernkurve: Monate bis Jahre (Quantenmechanik, Qiskit/Cirq)
- Anwendungsfälle: Extrem limitiert (Optimization, Simulation)
- Bei 0-2 Teilnehmer können es nutzen: **Verschwendung von Ressourcen**

**Konter auf Güney:** "Wir wollen ALLE Teilnehmer empowern, nicht nur Experten"

#### **2. Large Datasets: Das echte Problem**

**Argument:** "Challenge-Geber brauchen Big Data Processing, nicht Quantum"

**Belege:**
- **Financial Data:** 2-5 GB pro Unternehmen
- **Legal Documents:** 5-10 GB EU Regulations
- **Medical Papers:** 10-50 GB PubMed
- **Context Window Limits:** GPT-4o = 100 MB, Claude = 150 MB

**Problem:** "Wie analysieren Teams 50 GB Dokumente in 48h?"

**Lösung:** RAG Stack (nicht Quantum)

#### **3. Kosten-Effizienz**

**Argument:** "Self-Hosted Infrastructure ist 90%+ günstiger"

**Zahlen:**
```
Cloud-Only: $1,681 per Hackathon
Hybrid (2 Workstations): $200 per Hackathon
ROI: 5.4 Hackathons (2.7 Jahre bei 2/Jahr)

Quantum Computing: ??? (keine öffentlichen Preise)
```

**Frage an Güney:** "Was kostet Quantum Computing Access konkret?"

#### **4. Open Source > Vendor Lock-in**

**Argument:** "Open Source gibt uns Kontrolle und Transparenz"

**Stack:**
```
✅ vLLM/Ollama: Apache 2.0
✅ Qdrant: Apache 2.0
✅ BGE-M3: MIT License
✅ LangChain/LlamaIndex: MIT
✅ TEI: Apache 2.0

→ Kein Vendor Lock-in
→ Volle Kontrolle
→ Community Support
```

**Konter:** "Quantum = Proprietär, Abhängigkeit von Uptown Basel"

#### **5. Datengeschützte Anwendungen**

**Argument:** "Lokale Workstations ermöglichen Privacy-First Projekte"

**Use Cases:**
- Medizinische Daten (nicht in Cloud erlaubt)
- Finanz-Interna (NDA-geschützt)
- Legal Documents (Anwaltspflicht)
- Swiss Banking Standards

**Marketing:** "Baden Hackt: Der erste Privacy-First AI Hackathon"

#### **6. Uptown Basel besser nutzen**

**Vorschlag:** "Sponsoring statt Quantum Access"

**Alternativ-Angebot an Güney/Claudia:**
```
Uptown Basel sponsored:
1. 2× RTX 4090 Workstations (CHF 8,000)
   → "Powered by Uptown Basel" Branding

2. Keynote von Claudia Fricker (gratis)
   → "Future of AI & Quantum in Basel"

3. Site Visit für Gewinner (gratis)
   → Tour durch Quantum Lab

4. Special Quantum Challenge Track (optional)
   → Für die 2-3 Quantum-Experten

Win-Win:
- Uptown Basel: Marketing + Talent Sourcing
- Baden Hackt: Hardware + Prestige
- Teilnehmer: Praktische Tools + Quantum Einblick
```

---

## Teil 11: Finale Empfehlung

### Optimale Infrastruktur für Baden Hackt 2025

#### **Core Setup (Must-Have):**

**Hardware:**
```
2× RTX 4090 Workstations: CHF 8,000
- Lokal vor Ort in Baden
- 24/7 verfügbar während Hackathon
- Docker Stack vorinstalliert
```

**Software (Open Source):**
```
1. LLM Inference: Ollama (Llama 3.1 70B, Qwen 2.5 72B, DeepSeek Coder)
2. Embeddings: TEI + BGE-M3
3. Vector DB: Qdrant
4. Document Processing: Unstructured.io
5. RAG Frameworks: LangChain + LlamaIndex
6. API Gateway: LiteLLM
7. UI: Open WebUI
```

**Cloud Backup:**
```
$1,000 Budget für:
- OpenAI API ($500)
- Anthropic Claude ($300)
- RunPod GPU Credits ($200)
```

**Total Investment:** CHF 8,000 + $1,000 = **CHF 9,000**

#### **Uptown Basel Partnership (Nice-to-Have):**

**Option A: Sponsoring Focus**
- Uptown Basel sponsored 1-2 Workstations (CHF 4,000-8,000)
- Keynote von Claudia Fricker
- Site Visit für Gewinner
- **Kein Quantum Access nötig**

**Option B: Quantum Demo Track**
- Hauptfokus: RAG/LLM Stack (90% der Teilnehmer)
- Spezial-Track: Quantum Challenge (10% = Experten)
- Best of Both Worlds

#### **Marketing Positioning:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Baden Hackt 2025: AI Meets Real Data
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build AI Applications That Work With Real-World Data

✓ Process Gigabytes of Documents in Hours
✓ Local GPU Power (RTX 4090) for Privacy-First AI
✓ Open Source Stack (No Vendor Lock-in)
✓ Industry-Ready Tools (LangChain, Qdrant, vLLM)

5 Challenge Tracks:
1. Financial Analysis (2 GB Quarterly Reports)
2. Legal Document Search (5 GB Regulations)
3. Medical Literature Review (10 GB Papers)
4. Multi-Agent Systems (Complex Workflows)
5. [Quantum Computing Special] (Uptown Basel)

In Partnership with Uptown Basel Innovation Hub
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Erfolgsmetriken

**Technical KPIs:**
```
✓ 15-20 Teams nutzen RAG Stack
✓ 50+ GB Dokumente verarbeitet
✓ 100M+ Tokens processed
✓ <200ms Vector Search Latency
✓ 99%+ Uptime während 48h
```

**Business KPIs:**
```
✓ 100 Teilnehmer
✓ 20 funktionierende RAG-Prototypen
✓ 5 Production-Ready Demos
✓ Uptown Basel Sponsoring gesichert
✓ Lokale Medienberichte
```

**Community Impact:**
```
✓ Open Source Contributions
✓ Dokumentation für zukünftige Hackathons
✓ Startup-Gründungen aus Projekten
✓ Basel als AI-Hub positionieren
```

---

## Appendix: Technische Resources

### Essential Links

**Open Source LLM Hosting:**
- vLLM: https://github.com/vllm-project/vllm
- TGI: https://github.com/huggingface/text-generation-inference
- Ollama: https://ollama.com

**Vector Databases:**
- Qdrant: https://qdrant.tech
- ChromaDB: https://www.trychroma.com
- Weaviate: https://weaviate.io

**RAG Frameworks:**
- LangChain: https://python.langchain.com
- LlamaIndex: https://www.llamaindex.ai

**Embedding Models:**
- BGE-M3: https://huggingface.co/BAAI/bge-m3
- TEI: https://github.com/huggingface/text-embeddings-inference

**Document Processing:**
- Unstructured.io: https://unstructured.io
- LlamaParse: https://github.com/run-llama/llama_parse

**API Gateways:**
- LiteLLM: https://github.com/BerriAI/litellm
- OpenRouter: https://openrouter.ai

**MCP (Model Context Protocol):**
- Official Docs: https://modelcontextprotocol.io
- GitHub: https://github.com/modelcontextprotocol

### Example Projects

**Complete RAG Stacks:**
1. https://github.com/run-llama/llama_index/tree/main/llama-index-packs/llama-index-packs-rag-fusion
2. https://github.com/langchain-ai/langchain/tree/master/templates/rag-chroma
3. https://github.com/docker/genai-stack

**Hackathon Examples:**
- Financial RAG: https://www.kaggle.com/code/sherinegeorge21/building-a-financial-rag-system
- Legal ML Datasets: https://github.com/neelguha/legal-ml-datasets

### Quick Start Commands

**Full Stack in 5 Minutes:**
```bash
# Clone our setup
git clone https://github.com/baden-hackt/rag-stack
cd rag-stack

# Start everything
docker compose up -d

# Pre-load models (runs in background)
./scripts/preload_models.sh

# Verify
curl http://localhost:11434/v1/models
curl http://localhost:6333/dashboard
curl http://localhost:8080/health

# Run example
python examples/first_rag_query.py
```

---

## Kontakt & Nächste Schritte

**Für Diskussion mit Güney Usta:**
1. Dieses Dokument teilen
2. Kosten-Vergleich präsentieren (Teil 7)
3. Uptown Basel Alternativ-Vorschlag machen (Teil 10.6)
4. Konkretes Angebot: Hardware-Sponsoring statt Quantum Access

**Für OK Baden Hackt:**
1. Budget-Entscheid: CHF 8,000-9,000 für Workstations?
2. Uptown Basel Kontakt: Meeting mit Claudia Fricker organisieren
3. Timeline: 4 Wochen Pre-Hackathon Setup nötig

**Nächste Meetings:**
- [ ] Güney Usta: Technische Diskussion (dieses Dokument)
- [ ] Claudia Fricker: Sponsoring-Gespräch
- [ ] OK Sitzung: Budget-Freigabe

---

## Sources & References

1. **vLLM vs TGI:** https://modal.com/blog/vllm-vs-tgi-article
2. **Vector Database Comparison:** https://sysdebug.com/posts/vector-database-comparison-guide-2025/
3. **Embedding Models Comparison:** https://elephas.app/blog/best-embedding-models
4. **LangChain vs LlamaIndex:** https://latenode.com/blog/platform-comparisons-alternatives/automation-platform-comparisons/langchain-vs-llamaindex-2025-complete-rag-framework-comparison
5. **Chunking Strategies:** https://www.firecrawl.dev/blog/best-chunking-strategies-rag-2025
6. **Unstructured.io:** https://unstructured.io
7. **RAG Use Cases:** https://www.projectpro.io/article/rag-use-cases-and-applications/1059
8. **OpenRouter Review:** https://skywork.ai/blog/openrouter-review-2025-api-gateway-latency-pricing/
9. **MCP Deployment:** https://northflank.com/blog/how-to-build-and-deploy-a-model-context-protocol-mcp-server
10. **RTX 4090 Benchmarks:** https://nutstudio.imyfone.com/llm-tips/best-gpu-for-local-llm/
11. **Multi-Agent Frameworks:** https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen
12. **Vector Database Pricing:** https://airbyte.com/data-engineering-resources/milvus-database-pricing

---

**Dokument Version:** 1.0
**Letzte Aktualisierung:** 2025-12-03
**Erstellt von:** Claude Code (Anthropic)
**Für:** Baden Hackt OK & Güney Usta Diskussion
