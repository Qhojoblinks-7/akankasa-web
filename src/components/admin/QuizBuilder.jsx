import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, CheckCircle, Circle } from 'lucide-react';

const QUESTION_TYPES = [
  { value: 'multiple_choice', label: 'Multiple choice' },
  { value: 'true_false', label: 'True / False' },
  { value: 'fill_blank', label: 'Fill in the blank' }
];

const QuizBuilder = ({ value, onChange }) => {
  const [questions, setQuestions] = useState(() => {
    if (Array.isArray(value) && value.length > 0) {
      return value.map(q => ({
        id: q.id || Date.now() + Math.random(),
        type: q.type || 'multiple_choice',
        question: q.question || '',
        options: Array.isArray(q.options) ? q.options : ['', ''],
        correct: typeof q.correct === 'number' ? q.correct : 0
      }));
    }
    return [
      { id: Date.now(), type: 'multiple_choice', question: '', options: ['', ''], correct: 0 }
    ];
  });

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), type: 'multiple_choice', question: '', options: ['', ''], correct: 0 }]);
  };

  const removeQuestion = (id) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, val) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: val } : q));
  };

  const updateOption = (questionId, optionIndex, val) => {
    setQuestions(questions.map(q => {
      if (q.id !== questionId) return q;
      const newOptions = [...q.options];
      newOptions[optionIndex] = val;
      return { ...q, options: newOptions };
    }));
  };

  const addOption = (questionId) => {
    setQuestions(questions.map(q => {
      if (q.id !== questionId) return q;
      return { ...q, options: [...q.options, ''] };
    }));
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions(questions.map(q => {
      if (q.id !== questionId) return q;
      if (q.options.length <= 2) return q;
      const newOptions = q.options.filter((_, i) => i !== optionIndex);
      const newCorrect = q.correct >= optionIndex ? Math.max(0, q.correct - 1) : q.correct;
      return { ...q, options: newOptions, correct: newCorrect };
    }));
  };

  const setCorrectAnswer = (questionId, optionIndex) => {
    setQuestions(questions.map(q => {
      if (q.id !== questionId) return q;
      return { ...q, correct: optionIndex };
    }));
  };

  React.useEffect(() => {
    onChange(questions);
  }, [questions]);

  return (
    <div className="space-y-6">
      {questions.map((q, qIndex) => (
        <div key={q.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
              <span className="text-sm font-medium text-gray-500">Question {qIndex + 1}</span>
            </div>
            <button
              type="button"
              onClick={() => removeQuestion(q.id)}
              disabled={questions.length <= 1}
              className="text-gray-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={`Remove question ${qIndex + 1}`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <textarea
                value={q.question}
                onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                placeholder="Enter your question"
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question type</label>
              <select
                value={q.type}
                onChange={(e) => updateQuestion(q.id, 'type', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {QUESTION_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {q.type === 'multiple_choice' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-2">
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCorrectAnswer(q.id, optionIndex)}
                        className="flex-shrink-0"
                        aria-label={optionIndex === q.correct ? 'Correct answer' : 'Mark as correct'}
                      >
                        {optionIndex === q.correct ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(q.id, optionIndex, e.target.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {q.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(q.id, optionIndex)}
                          className="text-gray-400 hover:text-red-600 flex-shrink-0"
                          aria-label={`Remove option ${optionIndex + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addOption(q.id)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add option
                </button>
              </div>
            )}

            {q.type === 'true_false' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correct answer</label>
                <div className="flex gap-3">
                  {['True', 'False'].map((answer, idx) => (
                    <button
                      key={answer}
                      type="button"
                      onClick={() => {
                        updateQuestion(q.id, 'options', [answer, idx === 0 ? 'False' : 'True']);
                        setCorrectAnswer(q.id, idx);
                      }}
                      className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-colors ${
                        q.correct === idx
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q.type === 'fill_blank' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correct answer</label>
                <input
                  type="text"
                  value={q.options[0] || ''}
                  onChange={(e) => {
                    const newOptions = [...q.options];
                    newOptions[0] = e.target.value;
                    updateQuestion(q.id, 'options', newOptions);
                  }}
                  placeholder="Enter the correct answer"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add question
      </button>
    </div>
  );
};

export default QuizBuilder;
