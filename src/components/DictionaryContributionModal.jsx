import React from 'react';

const defaultForm = {
	akan: '',
	english: '',
	dialect: 'Twi',
	partOfSpeech: 'noun',
	pronunciation: '',
	etymology: '',
	examples: '', // comma-separated akan|english|audio
};

const DictionaryContributionModal = ({ isOpen, onClose, onSubmit }) => {
	const [form, setForm] = React.useState(defaultForm);

	React.useEffect(() => {
		if (!isOpen) setForm(defaultForm);
	}, [isOpen]);

	if (!isOpen) return null;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const examples = (form.examples || '')
			.split(',')
			.map(s => s.trim())
			.filter(Boolean)
			.map(s => {
				const [akan, english, audio] = s.split('|').map(x => (x || '').trim());
				return { akan, english, audio };
			});
		onSubmit({
			akan: form.akan.trim(),
			english: form.english.trim(),
			dialect: form.dialect,
			partOfSpeech: form.partOfSpeech,
			pronunciation: form.pronunciation.trim(),
			etymology: form.etymology.trim(),
			examples,
		});
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
			<div className="relative p-6 w-full max-w-xl bg-white rounded-lg shadow-xl m-4">
				<button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
				<h3 className="text-2xl font-bold text-gray-900 mb-4">Suggest a Dictionary Entry</h3>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Akan</label>
							<input name="akan" value={form.akan} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">English</label>
							<input name="english" value={form.english} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Dialect</label>
							<select name="dialect" value={form.dialect} onChange={handleChange} className="w-full border rounded px-3 py-2">
								<option>Twi</option>
								<option>Fante</option>
								<option>Akuapem</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Part of Speech</label>
							<select name="partOfSpeech" value={form.partOfSpeech} onChange={handleChange} className="w-full border rounded px-3 py-2">
								<option>noun</option>
								<option>verb</option>
								<option>adjective</option>
								<option>adverb</option>
								<option>interjection</option>
								<option>phrase</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Pronunciation</label>
							<input name="pronunciation" value={form.pronunciation} onChange={handleChange} className="w-full border rounded px-3 py-2" />
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Etymology</label>
						<textarea name="etymology" value={form.etymology} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={2} />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Examples (akan|english|audio, comma-separated)</label>
						<input name="examples" value={form.examples} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Me ho yɛ|I am fine|/audio/mehoye.mp3" />
					</div>
					<div className="flex justify-end gap-2">
						<button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
						<button type="submit" className="px-4 py-2 rounded text-white" style={{backgroundColor: '#564c38'}}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DictionaryContributionModal;