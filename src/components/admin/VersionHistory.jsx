import React, { useState, useEffect } from 'react';
import { History, RotateCcw, Clock, User, FileText } from 'lucide-react';

const VersionHistory = ({ tableName, recordId, onRestore }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('akankasa:admin_token');
        if (!token) return;
        const res = await fetch(`/api/admin/versions?table=${tableName}&id=${recordId}`, {
          headers: { Authorization: token }
        });
        const data = await res.json();
        setVersions(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (tableName && recordId) load();
  }, [tableName, recordId]);

  const handleRestore = async (version) => {
    if (!onRestore || !version.data) return;
    onRestore(version.data);
  };

  if (!tableName || !recordId) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        <History className="w-12 h-12 mx-auto mb-3 opacity-40" />
        <p>Select a record to view its version history</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#564c38] rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-600">Loading versions...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 flex items-center"><History className="w-5 h-5 mr-2 text-gray-500" />Version History</h3>
      </div>
      {versions.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No version history available yet.</div>
      ) : (
        <div className="divide-y divide-gray-200">
          {versions.map((version, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Version {versions.length - index}</p>
                  <p className="text-xs text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1" />{new Date(version.created_at).toLocaleString()}</p>
                  {version.changed_by && <p className="text-xs text-gray-500 flex items-center"><User className="w-3 h-3 mr-1" />{version.changed_by}</p>}
                </div>
              </div>
              {onRestore && (
                <button onClick={() => handleRestore(version)} className="text-sm text-[#564c38] hover:text-[#695e46] flex items-center"><RotateCcw className="w-4 h-4 mr-1" />Restore</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VersionHistory;