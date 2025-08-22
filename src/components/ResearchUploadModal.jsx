import React from 'react';

const defaultForm = {
	title: '',
	author: '',
	level: 'beginner',
	methodology: 'descriptive',
	features: '', // comma-separated keywords
	publicationDate: '',
	downloadUrl: '',
	abstract: '',
};

const ResearchUploadModal = ({ isOpen, onClose, onSubmit }) => {
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
		const tags = (form.features || '').split(',').map(s => s.trim()).filter(Boolean);
		onSubmit({
			title: form.title.trim(),
			author: form.author.trim(),
			level: form.level,
			methodology: form.methodology,
			tags,
			publicationDate: form.publicationDate || new Date().toISOString().slice(0,10),
			downloadUrl: form.downloadUrl.trim(),
			abstract: form.abstract.trim(),
			type: 'article',
		});
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
			<div className="relative p-6 w-full max-w-2xl bg-white rounded-lg shadow-xl m-4">
				<button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
				<h3 className="text-2xl font-bold text-gray-900 mb-4">Upload Research Resource</h3>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Title</label>
							<input name="title" value={form.title} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Author</label>
							<input name="author" value={form.author} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">Level</label>
							<select name="level" value={form.level} onChange={handleChange} className="w-full border rounded px-3 py-2">
								<option value="beginner">Beginner</option>
								<option value="intermediate">Intermediate</option>
								<option value="advanced">Advanced</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Methodology</label>
							<select name="methodology" value={form.methodology} onChange={handleChange} className="w-full border rounded px-3 py-2">
								<option value="descriptive">Descriptive</option>
								<option value="comparative">Comparative</option>
								<option value="corpus">Corpus</option>
								<option value="ethnographic">Ethnographic</option>
								<option value="experimental">Experimental</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Publication Date</label>
							<input name="publicationDate" type="date" value={form.publicationDate} onChange={handleChange} className="w-full border rounded px-3 py-2" />
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Download URL</label>
						<input name="downloadUrl" value={form.downloadUrl} onChange={handleChange} placeholder="/papers/your-file.pdf" className="w-full border rounded px-3 py-2" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Features/Tags (comma-separated)</label>
						<input name="features" value={form.features} onChange={handleChange} className="w-full border rounded px-3 py-2" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Abstract</label>
						<textarea name="abstract" value={form.abstract} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={4} />
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

export default ResearchUploadModal;