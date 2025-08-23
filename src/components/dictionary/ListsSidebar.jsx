import React from 'react';

import { ListPlus, Pencil, Trash2, X } from 'lucide-react';
import { dictionaryData } from '../../data/mockData';

const ListsSidebar = ({ wordLists, activeListId, onNewList, onSetActive, onRename, onDelete, onRemoveWord, isListModalOpen, setIsListModalOpen, newListName, setNewListName, renameState, setRenameState, onCreateList, onSaveRename }) => {
  return (
    <aside className="border-l border-gray-100 p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Word Lists</h3>
        <button onClick={onNewList} className="text-sm flex items-center"><ListPlus className="w-4 h-4 mr-1" /> New</button>
      </div>
      {Object.keys(wordLists).length === 0 ? (
        <p className="text-sm text-gray-600">No lists yet. Create one to start organizing words.</p>
      ) : (
        <ul className="space-y-2">
          {Object.values(wordLists).map(list => (
            <li key={list.id} className={`rounded p-2 ${activeListId === list.id ? 'bg-white shadow' : 'hover:bg-white'}`}>
              <div className="flex items-center justify-between">
                <button onClick={() => onSetActive(list.id)} className="font-medium text-sm text-left">
                  {list.name}
                </button>
                <div className="flex items-center gap-1">
                  <button onClick={() => setRenameState({ id: list.id, name: list.name })} className="p-1 rounded hover:bg-gray-100" title="Rename"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => onDelete(list.id)} className="p-1 rounded hover:bg-gray-100" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              {activeListId === list.id && (
                <div className="mt-2">
                  {list.wordIds.length === 0 ? (
                    <p className="text-sm text-gray-500">No words yet. Use + on a word to add it here.</p>
                  ) : (
                    <ul className="space-y-1">
                      {list.wordIds.map(id => {
                        const w = dictionaryData.find(d => d.id === id);
                        if (!w) return null;
                        return (
                          <li key={id} className="flex items-center justify-between bg-white rounded px-2 py-1">
                            <div className="text-sm">
                              <span className="font-medium">{w.akan}</span>
                              <span className="text-gray-500"> — {w.english}</span>
                            </div>
                            <button onClick={() => onRemoveWord(id)} className="text-gray-400 hover:text-red-500" title="Remove"><X className="w-4 h-4" /></button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {isListModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-sm">
            <h3 className="font-semibold mb-2">Create New List</h3>
            <input value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="List name" className="w-full border rounded px-3 py-2 mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsListModalOpen(false)} className="px-3 py-2 rounded border">Cancel</button>
              <button onClick={onCreateList} className="px-3 py-2 rounded text-white" style={{backgroundColor: '#564c38'}}>Create</button>
            </div>
          </div>
        </div>
      )}

      {renameState.id && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-sm">
            <h3 className="font-semibold mb-2">Rename List</h3>
            <input value={renameState.name} onChange={(e) => setRenameState(s => ({...s, name: e.target.value}))} className="w-full border rounded px-3 py-2 mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setRenameState({ id: null, name: '' })} className="px-3 py-2 rounded border">Cancel</button>
              <button onClick={onSaveRename} className="px-3 py-2 rounded text-white" style={{backgroundColor: '#564c38'}}>Save</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ListsSidebar;