import { useState, useCallback } from 'react';
import { downloadDocument, exportVocabulary } from '../api';

export function useDownload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const triggerBlobDownload = useCallback((blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const download = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { blob, filename } = await downloadDocument(id);
      triggerBlobDownload(blob, filename);
    } catch (err) {
      setError(err.message || 'Download failed');
    } finally {
      setLoading(false);
    }
  }, [triggerBlobDownload]);

  const exportVocab = useCallback(async (id, format = 'json') => {
    setLoading(true);
    setError(null);
    try {
      const { blob, filename } = await exportVocabulary(id, format);
      triggerBlobDownload(blob, filename);
    } catch (err) {
      setError(err.message || 'Export failed');
    } finally {
      setLoading(false);
    }
  }, [triggerBlobDownload]);

  return { download, exportVocab, loading, error };
}

export default useDownload;
