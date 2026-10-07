import React, { useState, useEffect } from 'react';
import { DOCUMENTS_DATA, BENCHMARK_TEST_CASES } from './data/documentsData';
import { SourceDocument, DocumentPage, QueryResult, TestCase } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { LiveRagWorkspace } from './components/LiveRagWorkspace';
import { AddDocumentModal } from './components/AddDocumentModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [documents, setDocuments] = useState<SourceDocument[]>(DOCUMENTS_DATA);
  const [testCases, setTestCases] = useState<TestCase[]>(BENCHMARK_TEST_CASES);
  const [selectedDoc, setSelectedDoc] = useState<SourceDocument>(DOCUMENTS_DATA[2]); // Default to IJDAR 2009 for rich curves
  const [selectedPage, setSelectedPage] = useState<DocumentPage>(DOCUMENTS_DATA[2].pages[7]); // Page 14 (PSNR curves)
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddDocModalOpen, setIsAddDocModalOpen] = useState<boolean>(false);
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');

  // Fetch documents and test cases from server on mount
  useEffect(() => {
    async function loadCorpus() {
      try {
        const docRes = await fetch('/api/documents');
        if (docRes.ok) {
          const docData = await docRes.json();
          if (docData.documents && docData.documents.length > 0) {
            setDocuments(docData.documents);
          }
        }

        const tcRes = await fetch('/api/test-cases');
        if (tcRes.ok) {
          const tcData = await tcRes.json();
          if (tcData.testCases && tcData.testCases.length > 0) {
            setTestCases(tcData.testCases);
          }
        }
      } catch (err) {
        console.warn('Using client-side fallback corpus:', err);
      }
    }
    loadCorpus();
  }, []);

  // Handler when a new document is added via modal
  const handleDocumentAdded = (newDoc: SourceDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDoc(newDoc);
    if (newDoc.pages && newDoc.pages.length > 0) {
      setSelectedPage(newDoc.pages[0]);
    }
    setActiveTab('workspace');
  };

  // Handler to remove a document from corpus
  const handleRemoveDocument = async (docId: string) => {
    try {
      await fetch(`/api/documents/${docId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to delete on server:', err);
    }
    const updated = documents.filter((d) => d.id !== docId);
    setDocuments(updated);
    if (selectedDoc.id === docId && updated.length > 0) {
      setSelectedDoc(updated[0]);
      setSelectedPage(updated[0].pages[0]);
    }
  };

  // Handler to reset corpus to default reference documents
  const handleResetDocuments = async () => {
    try {
      const res = await fetch('/api/documents/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.documents) {
          setDocuments(data.documents);
          setSelectedDoc(data.documents[0]);
          setSelectedPage(data.documents[0].pages[0]);
          return;
        }
      }
    } catch (err) {
      console.warn('Reset failed on server, resetting client:', err);
    }
    setDocuments([...DOCUMENTS_DATA]);
    setSelectedDoc(DOCUMENTS_DATA[0]);
    setSelectedPage(DOCUMENTS_DATA[0].pages[0]);
  };

  // Execute Multimodal Query
  const handleRunQuery = async (
    query: string,
    docIds: string[],
    mode: string,
    testCaseId?: string
  ) => {
    setActiveSearchQuery(query);
    setIsLoading(true);
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          selectedDocIds: docIds,
          mode,
          testCaseId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error status ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        setQueryResult(data.result);

        // Auto-navigate document viewer to the highest confidence citation
        if (data.result.citations && data.result.citations.length > 0) {
          const topCitation = data.result.citations[0];
          const foundDoc = documents.find((d) => d.id === topCitation.documentId);
          if (foundDoc) {
            setSelectedDoc(foundDoc);
            const foundPage = foundDoc.pages.find(
              (p) => p.pageNumber === topCitation.pageNumber
            );
            if (foundPage) {
              setSelectedPage(foundPage);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error executing query:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Direct search action triggered from HomePage
  const handleSearchFromHome = (query: string, docId?: string) => {
    setActiveSearchQuery(query);
    setActiveTab('workspace');
    const targetDocIds = docId && docId !== 'all' ? [docId] : documents.map((d) => d.id);
    handleRunQuery(query, targetDocIds, 'vision_first');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        documentsCount={documents.length}
        onOpenAddDocument={() => setIsAddDocModalOpen(true)}
      />

      {/* Main Tab View */}
      <main className="flex-1 flex min-h-0 overflow-hidden relative">
        {activeTab === 'home' && (
          <HomePage
            documents={documents}
            onOpenAddDocument={() => setIsAddDocModalOpen(true)}
            onGoToWorkspace={() => setActiveTab('workspace')}
            onSearchQuestion={handleSearchFromHome}
          />
        )}

        {activeTab === 'workspace' && (
          <LiveRagWorkspace
            documents={documents}
            testCases={testCases}
            selectedDoc={selectedDoc}
            setSelectedDoc={setSelectedDoc}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            queryResult={queryResult}
            onRunQuery={handleRunQuery}
            isLoading={isLoading}
            onOpenAddDocument={() => setIsAddDocModalOpen(true)}
            onRemoveDocument={handleRemoveDocument}
            initialSearchQuery={activeSearchQuery}
          />
        )}
      </main>

      {/* Add Document Modal */}
      <AddDocumentModal
        isOpen={isAddDocModalOpen}
        onClose={() => setIsAddDocModalOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />
    </div>
  );
}
