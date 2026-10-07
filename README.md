# Multimodal Document Intelligence

> A Vision-First Retrieval-Augmented Generation (RAG) and Document Intelligence system designed to read, reason across, and visually ground information in complex mixed documents (PDFs, multi-column color-coded tables, line charts, bar plots, formulas, and degraded scanned pages).

---

## 1. What the Project Does

Traditional document processing pipelines rely on standard Optical Character Recognition (OCR) to convert document pages into plain, linear text strings. When dealing with complex business reports, scientific papers, datasheets, or institutional schedules, this text-flattening approach fails because:
- **Tables lose spatial orientation**: Multi-column matrix layouts, column headers, and cell subscripts (e.g., $T_1$, $T_2$, $E_1$) collapse into garbled sequences.
- **Charts and visual plots are ignored**: Pixels containing trendlines, color-coded legends, axis scales, and Pareto bars have no searchable text.
- **Degraded scans cause OCR hallucinations**: Ink bleed-through, paper discoloration, and physical noise destroy character recognition.

### Core Capabilities

**Multimodal Document Intelligence** solves this by treating document pages as high-resolution visual tokens and layout matrices:

1. **Mixed-Modality Understanding**: Integrates textual, tabular, and visual information simultaneously across single or multiple documents.
2. **Visual Content Grounding**: Evaluates charts and plots directly as visual elements, enabling reasoning over trends, cross-series comparisons, and axes.
3. **Interactive Document Viewer**: Visualizes the cited document page with dynamic colored bounding-box overlays corresponding to the answer evidence.
4. **Arithmetic & Mathematical Proof**: Solves numeric problems (variance analysis, deltas, percentages, date math) and outputs an explicit mathematical proof.
5. **Dynamic Document Management**: Allows users to upload custom documents or select presets, immediately indexing them for multimodal search and query.

---

## 2. Technologies, Libraries, and Models Used

### Core AI & Vision-Language Models
- **Google Gemini 3.8 Flash (`models/gemini-3.8-flash`)**: Central multimodal reasoning model invoked via the `@google/genai` TypeScript SDK for analyzing document context and extracting structured JSON schemas with citations and bounding boxes.
- **High-Precision Multimodal Semantic Reasoning Engine**: Built-in fallback engine featuring token stemming, synonym expansion, visual patch spatial anchoring, and sentence-level extractive scoring. Ensures 100% availability even during remote API rate limits or network degradation.

### Frameworks & Libraries

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.0.1` | Component-based interactive UI with dual-pane layout |
| **Language** | TypeScript | `^7.0.2` | End-to-end type safety, interfaces, and build verification |
| **Styling** | Tailwind CSS | `^4.3.3` | Utility-first responsive dark theme design |
| **Icons** | Lucide React | `^0.546.0` | Comprehensive iconography for document types and actions |
| **Bundler & Dev Server** | Vite | `^8.3.0` | Ultra-fast client compilation and hot module reloading |
| **Vite Tailwind Plugin** | `@tailwindcss/vite`| `^4.3.3` | Native Tailwind CSS v4 compilation |
| **Vite React Plugin** | `@vitejs/plugin-react` | `^6.1.1` | React JSX runtime compilation |
| **Backend Server** | Express | `^4.21.2` | RESTful API server hosting query, document, and search endpoints |
| **Server Runtime** | `tsx` | `^4.21.0` | TypeScript execution for `server.ts` |
| **Google GenAI SDK** | `@google/genai` | `^2.4.0` | Official Google GenAI TypeScript SDK |
| **Environment Config** | `dotenv` | `^17.2.3` | Manages environment variables |

---

## 3. How to Install Dependencies

### Prerequisites
- **Node.js**: Version 18.x or 20.x or higher
- **npm** (comes with Node.js) or **bun** / **yarn**

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/multimodal-document-intelligence.git
   cd multimodal-document-intelligence
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

   This installs all client dependencies (`react`, `lucide-react`, `tailwindcss`) and backend dependencies (`express`, `@google/genai`, `dotenv`, `tsx`).

---

## 4. How to Configure and Run the System

### 1. Configure Environment Variables

Copy the provided `.env.example` file to create a local `.env` file:

```bash
cp .env.example .env
```

Open `.env` and configure your credentials:

```env
# GEMINI_API_KEY: Required for live Gemini 3.8 Flash model reasoning.
# (If omitted or invalid, the built-in High-Precision Multimodal Search Engine automatically activates)
GEMINI_API_KEY="your-gemini-api-key-here"

# PORT: Port on which the Express server and Vite development server run.
PORT=3000

# APP_URL: URL where the application is hosted (optional in local development).
APP_URL="http://localhost:3000"
```

### 2. Run the System

#### Development Mode (Recommended)
Starts the full-stack Express server with integrated Vite middleware on port 3000:

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

#### Production Mode
Compiles client assets into `dist/` and runs the production server:

```bash
npm run build
npm start
```

#### Code Validation & Linting
Checks for TypeScript compilation errors and type compatibility across all files:

```bash
npm run lint
```

---

## 5. How to Reproduce the Demonstrated Results

The system can be tested either through the **Interactive Web UI** or directly via the **REST API**.

### Method A: Via the Web User Interface

1. Open `http://localhost:3000` in your web browser.
2. In the top navigation bar, select **Home** or **Document Q&A**.
3. In the search bar, type any of the test questions below (or click on the **Quick Searches** / **Suggested Searches** chips).
4. Click **Ask Question** (or press `Enter`).
5. Observe:
   - **Answer Summary**: Direct factual answer.
   - **Grounded Citations**: Document title, page number, and section name.
   - **Visual Bounding Box**: Highlighted region on the rendered document page in the right pane.
   - **Mathematical Proof**: Detailed formula and numeric step verification.
   - **Reasoning Steps**: Execution trace through query parsing, visual patch grounding, and verification.

---

### Method B: Via cURL / REST API

You can reproduce the exact system output from the command line:

```bash
curl -s -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query":"When do classes start for first year students?"}'
```

---

### Demonstrated Test Cases & Benchmark Results

#### Test Case 1: Academic Calendar Table Reasoning (Subscripts & Multi-Column Matrix)
- **Question**: `"When do classes start for first year students?"`
- **Expected Document**: *Karunya Institute Academic Calendar 2026–2027*
- **Cited Page**: Page 3 (*Monthly Schedule: July 2026*)
- **Target Bounding Box**: `[ymin: 76%, xmin: 80%, ymax: 84%, xmax: 96%]` (*Class Commencement I Yr UG (July 27)*)
- **Demonstrated Answer**:
  > For First Year (I Year) UG Students, class commencement is on **Monday, July 27, 2026 (Day 1)**. Student enrollment takes place from **Wednesday, July 22 to Friday, July 24, 2026**.
- **Cross-Batch Verification**: Confirms Final Year UG commenced earlier on **Monday, June 22, 2026** (Page 2), and continuing batches commenced on **Wednesday, July 8, 2026** (Page 3).

---

#### Test Case 2: Institutional Milestones & Event Dates
- **Question**: `"When is the 33rd convocation?"`
- **Expected Document**: *Karunya Institute Academic Calendar 2026–2027*
- **Cited Page**: Page 3 (*Monthly Schedule: July 2026*)
- **Target Bounding Box**: `[ymin: 19%, xmin: 38%, ymax: 25%, xmax: 62%]` (*33rd Convocation (July 4)*)
- **Demonstrated Answer**:
  > The 33rd Convocation of Karunya Institute is scheduled for **Saturday, July 4, 2026**, documented on Page 3 of the Academic Calendar. Preceding events include the Annual Staff Retreat on July 1–2, 2026.

---

#### Test Case 3: Operations Chart & Root Cause Variance Analysis
- **Question**: `"Compare production efficiency between Q2 and Q4, identify the three biggest reasons for the change, and show me the proof"`
- **Expected Document**: *Global Operations: Q2 vs Q4 Production Efficiency Report*
- **Cited Pages**: Page 1 (*Table 1: Quarterly Production Benchmarks*) & Page 2 (*Figure 2: Downtime Pareto Analysis*)
- **Demonstrated Answer**:
  > Production efficiency declined by **-12.3%** from Q2 (88.4%, 42h downtime) to Q4 (76.1%, 118h downtime). The three biggest reasons for the decline were:
  > 1. **Micro-component supply chain stockout**: 46 hours downtime (39.0%)
  > 2. **Unscheduled Line B hydraulic press failure**: 34 hours downtime (28.8%)
  > 3. **Operator onboarding & turnover during shift expansion**: 24 hours downtime (20.3%)
- **Mathematical Proof**:
  > $\Delta\text{Efficiency} = 76.1\% - 88.4\% = -12.3\%$. $\Delta\text{Downtime} = 118\text{h} - 42\text{h} = +76\text{ hours}$. Top 3 causes sum: $46 + 34 + 24 = 104\text{ hours}$ ($\frac{104}{118} = 88.14\%$ of total downtime).

---

#### Test Case 4: Degraded Scans & Physical Degradation Modeling
- **Question**: `"Compare PSNR and OCR recognition rate of the proposed diffusion restoration versus ICA in Farrahi Moghaddam 2009"`
- **Expected Document**: *Low-Quality Document Image Modeling and Bleed-Through Restoration (IJDAR 2009)*
- **Cited Pages**: Page 14 (*Figure 20: PSNR Evolution*) & Page 15 (*Figure 21: OCR Recognition Accuracy*)
- **Demonstrated Answer**:
  > In Farrahi Moghaddam (2009), the proposed reverse diffusion restoration maintains a steady PSNR of **~21–22 dB** and near-perfect OCR accuracy (**~98–100%**) up to $n=40$ iterations. In contrast, the ICA baseline fluctuates below 10 dB and collapses completely to **0% OCR recognition** above $n=20$.
- **Reasoning**: ICA assumes an instantaneous linear mixture ($x = As$), but physical ink bleed-through is a nonlinear diffusion PDE governed by Equation (5).

---

#### Test Case 5: Hardware Engineering Datasheets
- **Question**: `"What is the maximum power Pmax and open circuit voltage Voc of the Helios-X solar panel?"`
- **Expected Document**: *Helios-X 600W Bifacial Solar PV Datasheet*
- **Cited Page**: Page 1 (*Electrical Characteristics (STC)*)
- **Target Bounding Box**: `[ymin: 15%, xmin: 10%, ymax: 55%, xmax: 90%]` (*STC Specifications Table*)
- **Demonstrated Answer**:
  > The Helios-X 600W solar module delivers maximum power $P_{\max} = 600\text{ W}$, module efficiency = $23.2\%$, open circuit voltage $V_{\text{oc}} = 51.8\text{ V}$, short circuit current $I_{\text{sc}} = 14.82\text{ A}$, and temperature coefficient of $-0.30\%/\text{°C}$.

---

#### Test Case 6: Dynamic Custom Document Ingestion
To verify dynamic document addition and query:

1. Send a POST request to add a new document:
   ```bash
   curl -s -X POST http://localhost:3000/api/documents \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Quarterly Financial Overview",
       "pages": [{
         "pageNumber": 1,
         "title": "Revenue Summary",
         "section": "Financial Metrics",
         "summary": "Revenue increased by 18.5% reaching $4.2M with operating margins expanding to 24.1%.",
         "ocrText": "Total revenue grew by 18.5% to $4.2M with 24.1% operating margin.",
         "keyElements": ["Revenue: $4.2M", "Margin: 24.1%"],
         "boundingBoxes": [{"ymin": 15, "xmin": 15, "ymax": 45, "xmax": 85, "label": "Financial Chart", "confidence": 0.98}]
       }]
     }'
   ```
2. Query the custom document:
   ```bash
   curl -s -X POST http://localhost:3000/api/query \
     -H "Content-Type: application/json" \
     -d '{"query":"What was the revenue and operating margin?"}'
   ```
3. The response will cite **Quarterly Financial Overview**, Page 1, with the exact extracted metrics and coordinates.

---

## 6. Project Architecture Overview

```
                          [User Query: Text / Search]
                                       │
                                       ▼
                     ┌──────────────────────────────────┐
                     │ Express API Router (/api/query)  │
                     └──────────────────────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
        ┌─────────────────────────┐           ┌─────────────────────────┐
        │  Gemini 3.8 Flash SDK   │           │   High-Precision Local  │
        │    (@google/genai)      │           │    Multimodal Search    │
        └─────────────────────────┘           └─────────────────────────┘
                    │                                     │
                    └──────────────────┬──────────────────┘
                                       ▼
                   ┌────────────────────────────────────────┐
                   │    Structured QueryResult Schema       │
                   │  - directAnswerSummary                 │
                   │  - citations (docId, page, box)        │
                   │  - mathProof                           │
                   │  - reasoningSteps                      │
                   └────────────────────────────────────────┘
                                       │
                                       ▼
                     ┌──────────────────────────────────┐
                     │  Dual-Pane React Workspace (UI)  │
                     │  - Left: Answer & Evidence       │
                     │  - Right: PageRenderer with      │
                     │          SVG Bounding Box Overlay│
                     └──────────────────────────────────┘
