import React, { useState } from 'react';
import { SourceDocument, DocumentPage, BoundingBox } from '../types';
import {
  X,
  Upload,
  Plus,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  BarChart3,
  FileSpreadsheet,
  Layers,
  Trash2,
} from 'lucide-react';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded: (newDoc: SourceDocument) => void;
}

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onClose,
  onDocumentAdded,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'preset' | 'manual'>('upload');
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Business Report');
  const [pages, setPages] = useState<
    Array<{
      title: string;
      text: string;
      summary: string;
      visualType: string;
      imageUrl?: string;
      keyElements: string[];
    }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  // Handle image files upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!title) {
      const fileName = files[0].name.replace(/\.[^/.]+$/, '');
      setTitle(fileName.replace(/[-_]/g, ' '));
    }

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Data = uploadEvent.target?.result as string;
        setPages((prev) => [
          ...prev,
          {
            title: `Page ${prev.length + 1}: ${file.name}`,
            text: `Document text for ${file.name}. Includes visual layout, tabular metrics, and graphics.`,
            summary: `High-resolution scan of ${file.name} ready for Vision-First analysis.`,
            visualType: file.type.includes('image') ? 'chart' : 'scan_defect',
            imageUrl: base64Data,
            keyElements: ['High-res visual scan', 'Visual patch tokens', 'Table / Chart region'],
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Add Preset: Q2 vs Q4 Production Efficiency Report
  const handleAddProductionPreset = () => {
    const presetDoc: SourceDocument = {
      id: `doc-production-efficiency-${Date.now()}`,
      title: 'Global Operations: Q2 vs Q4 Production Efficiency Report',
      subtitle: 'Manufacturing Line Variance & Throughput Audit',
      category: 'Industrial Manufacturing & Operations',
      totalPages: 2,
      published: '2026-09-30',
      authorsOrOrg: 'Apex Dynamics Operations Intelligence',
      description: 'Quarterly manufacturing audit analyzing assembly line output, downtime causes, and efficiency comparisons between Q2 and Q4.',
      tags: ['Production Efficiency', 'Bar Charts', 'Quarterly Tables', 'Root Cause'],
      pages: [
        {
          pageNumber: 1,
          title: 'Executive Summary & Quarterly Efficiency Table',
          section: 'Section 1: Comparative Output Analysis',
          hasVisualContent: true,
          visualType: 'table',
          renderType: 'chart_plot',
          summary: 'Production efficiency in Q2 averaged 88.4% (throughput 4,210 units/day) with downtime of 42 hours. In Q4, production efficiency declined to 76.1% (throughput 3,450 units/day) with downtime surging to 118 hours (-12.3% net efficiency drop).',
          ocrText: 'TABLE 1: QUARTERLY PRODUCTION BENCHMARKS\nQuarter | Efficiency | Units/Day | Downtime (hrs) | Defect Rate\nQ1      | 84.2%      | 3,980     | 58 hrs         | 1.8%\nQ2      | 88.4%      | 4,210     | 42 hrs         | 1.4%\nQ3      | 82.0%      | 3,710     | 79 hrs         | 2.1%\nQ4      | 76.1%      | 3,450     | 118 hrs        | 3.4%\nDelta (Q4 vs Q2): -12.3% Efficiency (-760 units/day), +76 hrs downtime.',
          keyElements: ['Q2 Efficiency: 88.4%', 'Q4 Efficiency: 76.1% (-12.3%)', 'Downtime surge: +76 hours', 'Defect rate rise: 1.4% to 3.4%'],
          boundingBoxes: [
            { ymin: 15, xmin: 10, ymax: 48, xmax: 90, label: 'Table 1: Quarterly Efficiency Benchmarks', confidence: 0.99 },
            { ymin: 55, xmin: 10, ymax: 85, xmax: 90, label: 'Variance Analysis Paragraph', confidence: 0.98 },
          ],
        },
        {
          pageNumber: 2,
          title: 'Root Cause Breakdown: Three Primary Reasons for Decline',
          section: 'Section 2: Primary Drivers of Efficiency Loss',
          hasVisualContent: true,
          visualType: 'chart',
          renderType: 'chart_plot',
          summary: 'Root cause Pareto analysis isolates the 3 biggest reasons for the 12.3% drop from Q2 to Q4: 1. Micro-component supply chain bottleneck (responsible for 46 hours / 39% of downtime); 2. Unscheduled hydraulic press maintenance on Line B (34 hours / 29% of downtime); 3. Seasonal operator onboarding turnover during shift expansion (24 hours / 20% of downtime).',
          ocrText: 'FIGURE 2: PARETO BREAKDOWN OF Q4 EFFICIENCY LOSS\nReason 1: Micro-component supply chain stockout -> 46 hours downtime (39.0% contribution)\nReason 2: Unscheduled Line B hydraulic press failure -> 34 hours downtime (28.8% contribution)\nReason 3: Operator onboarding & training curve -> 24 hours downtime (20.3% contribution)\nOther minor causes: 14 hours (11.9%)\nTotal Q4 downtime: 118 hours.',
          keyElements: ['Reason 1: Component Stockout (46h / 39%)', 'Reason 2: Hydraulic Press Failure (34h / 28.8%)', 'Reason 3: Operator Onboarding Turnover (24h / 20.3%)'],
          boundingBoxes: [
            { ymin: 12, xmin: 10, ymax: 52, xmax: 90, label: 'Figure 2: Downtime Pareto Bar Chart', confidence: 0.99 },
            { ymin: 58, xmin: 10, ymax: 90, xmax: 90, label: 'Section 2.3: Root Cause Corrective Plan', confidence: 0.97 },
          ],
        },
      ],
    };

    submitNewDocument(presetDoc);
  };

  // Add Preset: Solar Technical Datasheet
  const handleAddSolarPreset = () => {
    const presetDoc: SourceDocument = {
      id: `doc-solar-pv-${Date.now()}`,
      title: 'Helios-X 600W Bifacial Photovoltaic Datasheet',
      subtitle: 'N-Type TOPCon Dual-Glass Solar Module Performance Matrix',
      category: 'Renewable Energy & Engineering',
      totalPages: 1,
      published: '2026-08-15',
      authorsOrOrg: 'Helios CleanTech Systems',
      description: 'Technical engineering specifications with I-V electrical curves, temperature coefficients, and mechanical load limits.',
      tags: ['Solar Energy', 'I-V Curve', 'Electrical Specs', 'Datasheet'],
      pages: [
        {
          pageNumber: 1,
          title: 'Electrical Specifications & Temperature Derating Curve',
          section: 'Section 1: Standard Test Conditions (STC)',
          hasVisualContent: true,
          visualType: 'plot',
          renderType: 'chart_plot',
          summary: 'Maximum power Pmax 600W, open circuit voltage Voc 51.8V, short circuit current Isc 14.82A, module efficiency 23.2%. Temperature coefficient of Pmax is -0.30%/°C.',
          ocrText: 'ELECTRICAL DATA (STC: 1000 W/m², 25°C, AM1.5)\nMax Power (Pmax): 600 W\nVoltage at Pmax (Vmp): 43.1 V\nCurrent at Pmax (Imp): 13.93 A\nOpen Circuit Voltage (Voc): 51.8 V\nShort Circuit Current (Isc): 14.82 A\nModule Efficiency: 23.2%\nTemperature Coefficient (Pmax): -0.30%/°C\nBifaciality Factor: 80% ± 5%',
          keyElements: ['Max Power: 600W', 'Module Efficiency: 23.2%', 'Temp Coeff: -0.30%/°C', 'Bifaciality: 80%'],
          boundingBoxes: [
            { ymin: 10, xmin: 10, ymax: 50, xmax: 90, label: 'STC Electrical Performance Table', confidence: 0.99 },
            { ymin: 55, xmin: 10, ymax: 90, xmax: 90, label: 'I-V Irradiance Curve Graph', confidence: 0.98 },
          ],
        },
      ],
    };

    submitNewDocument(presetDoc);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || pages.length === 0) return;

    const formattedDoc: SourceDocument = {
      id: `doc-custom-${Date.now()}`,
      title,
      subtitle: subtitle || 'Custom Uploaded Multimodal Document',
      category,
      totalPages: pages.length,
      published: new Date().toISOString().split('T')[0],
      authorsOrOrg: 'User Upload',
      description: `Uploaded document with ${pages.length} page(s) processed for Vision-First RAG.`,
      tags: ['Uploaded', category],
      pages: pages.map((p, idx) => ({
        pageNumber: idx + 1,
        title: p.title || `Page ${idx + 1}`,
        section: `Section ${idx + 1}`,
        hasVisualContent: true,
        visualType: (p.visualType as any) || 'chart',
        renderType: 'generic',
        summary: p.summary || p.text.substring(0, 200),
        ocrText: p.text,
        keyElements: p.keyElements.length > 0 ? p.keyElements : ['Page Content'],
        imageUrl: p.imageUrl,
        boundingBoxes: [
          {
            ymin: 15,
            xmin: 15,
            ymax: 60,
            xmax: 85,
            label: `${p.visualType.toUpperCase()} Area`,
            confidence: 0.95,
          },
        ],
      })),
    };

    submitNewDocument(formattedDoc);
  };

  const submitNewDocument = async (doc: SourceDocument) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      });

      if (res.ok) {
        const data = await res.json();
        onDocumentAdded(data.document || doc);
        onClose();
      } else {
        // Fallback to client-side addition
        onDocumentAdded(doc);
        onClose();
      }
    } catch (err) {
      console.warn('Network issue adding document, using client fallback:', err);
      onDocumentAdded(doc);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add New Document</h3>
              <p className="text-xs text-slate-400">
                Index PDFs, image scans, or sample reports into the multimodal pipeline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 border-b border-slate-800 flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 transition border-b-2 ${
              activeTab === 'upload'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Upload File(s)
          </button>
          <button
            onClick={() => setActiveTab('preset')}
            className={`pb-2.5 transition border-b-2 ${
              activeTab === 'preset'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sample Preset Reports
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`pb-2.5 transition border-b-2 ${
              activeTab === 'manual'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Manual Text Entry
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Tab 1: Upload Files */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-6 text-center space-y-3 bg-slate-950/40 transition">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <label className="cursor-pointer">
                    <span className="text-sm font-bold text-emerald-400 hover:text-emerald-300">
                      Click to choose files
                    </span>
                    <span className="text-xs text-slate-400"> or drag and drop</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Supports PNG, JPG, WebP images, or scanned document pages
                  </p>
                </div>
              </div>

              {/* Uploaded Pages Preview List */}
              {pages.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                    <span>Uploaded Pages ({pages.length}):</span>
                    <button
                      onClick={() => setPages([])}
                      className="text-rose-400 hover:text-rose-300 text-[11px]"
                    >
                      Clear all
                    </button>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {pages.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                      >
                        {p.imageUrl ? (
                          <img
                            src={p.imageUrl}
                            alt="preview"
                            className="w-10 h-10 object-cover rounded border border-slate-700"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                            <FileText className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex-1 overflow-hidden">
                          <div className="font-semibold text-slate-200 truncate">{p.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{p.summary}</div>
                        </div>
                        <button
                          onClick={() => setPages(pages.filter((_, i) => i !== idx))}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Document Title:
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Q4 Financial & Operations Review"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Sample Presets */}
          {activeTab === 'preset' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed">
                Add ready-to-test realistic multimodal reports featuring color tables, bar charts, and technical curves:
              </p>

              {/* Preset 1: Q2 vs Q4 Production Efficiency */}
              <div
                onClick={handleAddProductionPreset}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 cursor-pointer transition shadow group space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 border border-sky-800/60 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
                        Q2 vs Q4 Production Efficiency Report (2 Pages)
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Manufacturing Line Audit · Bar Charts &amp; Quarterly Tables
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-[10px] font-semibold">
                    1-Click Add
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pl-10">
                  Directly tests the prompt query: <em>"Compare production efficiency between Q2 and Q4, identify the three biggest reasons for the change, and show me the proof"</em>.
                </p>
              </div>

              {/* Preset 2: Solar Energy Datasheet */}
              <div
                onClick={handleAddSolarPreset}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 cursor-pointer transition shadow group space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/60 flex items-center justify-center">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
                        Helios 600W Photovoltaic Technical Datasheet
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Engineering Specification · I-V Curves &amp; Electrical STC Tables
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-[10px] font-semibold">
                    1-Click Add
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pl-10">
                  Evaluates technical engineering tables, voltage coefficients, module efficiency, and temperature derating curves.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Manual Entry */}
          {activeTab === 'manual' && (
            <form onSubmit={handleCustomSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Document Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Environmental Impact Assessment 2026"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Subtitle:</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Emission Data & Graphs"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Category:</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Scientific Report"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Page 1 Content / OCR Text:
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste text, tables, or data from the document here..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
                  onChange={(e) => {
                    const text = e.target.value;
                    setPages([
                      {
                        title: 'Page 1 Content',
                        text,
                        summary: text.substring(0, 150),
                        visualType: 'table',
                        keyElements: ['User submitted content'],
                      },
                    ]);
                  }}
                />
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
          >
            Cancel
          </button>

          {activeTab !== 'preset' && (
            <button
              onClick={handleCustomSubmit}
              disabled={isSubmitting || !title.trim() || pages.length === 0}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition"
            >
              {isSubmitting ? (
                <span>Indexing Document...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Index Document ({pages.length} Pages)</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
