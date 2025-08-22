import React from 'react';

const MOD_QUEUE_KEY = 'akan:moderation-queue:culture';
const DICT_QUEUE_KEY = 'akan:moderation-queue:dictionary';

const AdminModeration = () => {
	const [queue, setQueue] = React.useState([]);
	const [dictQueue, setDictQueue] = React.useState([]);
	const [activeTab, setActiveTab] = React.useState('culture');

	React.useEffect(() => {
		try {
			const raw = localStorage.getItem(MOD_QUEUE_KEY);
			setQueue(raw ? JSON.parse(raw) : []);
		} catch {
			setQueue([]);
		}
		try {
			const raw = localStorage.getItem(DICT_QUEUE_KEY);
			setDictQueue(raw ? JSON.parse(raw) : []);
		} catch {
			setDictQueue([]);
		}
	}, []);

	const persist = (key, value) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch {}
	};

	const approve = (key, listSetter, list, id) => {
		const next = list.map(item => item.id === id ? { ...item, status: 'approved', reviewedAt: new Date().toISOString() } : item);
		listSetter(next);
		persist(key, next);
	};

	const rejectItem = (key, listSetter, list, id) => {
		const next = list.map(item => item.id === id ? { ...item, status: 'rejected', reviewedAt: new Date().toISOString() } : item);
		listSetter(next);
		persist(key, next);
	};

	const clearReviewed = (key, listSetter, list) => {
		const next = list.filter(item => item.status === 'pending');
		listSetter(next);
		persist(key, next);
	};

	const TabButton = ({ id, children }) => (
		<button
			onClick={() => setActiveTab(id)}
			className={`px-4 py-2 rounded ${activeTab === id ? 'bg-[#564c38] text-white' : 'border'}`}
		>
			{children}
		</button>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Moderation Queue</h1>
				<div className="flex items-center gap-2 mb-4">
					<TabButton id="culture">Culture</TabButton>
					<TabButton id="dictionary">Dictionary</TabButton>
				</div>

				{activeTab === 'culture' && (
					<>
						<div className="bg-white rounded-lg shadow p-4 mb-4 flex items-center justify-between">
							<div>
								<span className="font-medium">Total:</span> {queue.length}
								<span className="ml-4 text-yellow-700">Pending:</span> {queue.filter(q => q.status === 'pending').length}
							</div>
							<button onClick={() => clearReviewed(MOD_QUEUE_KEY, setQueue, queue)} className="text-sm px-3 py-1.5 rounded border" style={{borderColor: '#f1d799', color: '#564c38'}}>Clear Reviewed</button>
						</div>
						{queue.length === 0 ? (
							<p className="text-gray-600">No submissions yet.</p>
						) : (
							<ul className="space-y-3">
								{queue.map(item => (
									<li key={item.id} className="bg-white rounded-lg shadow p-4">
										<div className="flex items-center justify-between">
											<div>
												<div className="text-sm text-gray-500">{item.section}</div>
												<div className="text-lg font-semibold">{item.title}</div>
												<div className="text-gray-600 line-clamp-2 max-w-3xl">{item.description}</div>
											</div>
											<div className="flex items-center space-x-2">
												<span className={`px-2 py-1 rounded text-xs ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : item.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.status}</span>
												<button onClick={() => approve(MOD_QUEUE_KEY, setQueue, queue, item.id)} className="px-3 py-1.5 text-sm rounded bg-green-600 text-white">Approve</button>
												<button onClick={() => rejectItem(MOD_QUEUE_KEY, setQueue, queue, item.id)} className="px-3 py-1.5 text-sm rounded bg-red-600 text-white">Reject</button>
											</div>
										</div>
									</li>
								))}
							</ul>
						)}
					</>
				)}

				{activeTab === 'dictionary' && (
					<>
						<div className="bg-white rounded-lg shadow p-4 mb-4 flex items-center justify-between">
							<div>
								<span className="font-medium">Total:</span> {dictQueue.length}
								<span className="ml-4 text-yellow-700">Pending:</span> {dictQueue.filter(q => q.status === 'pending').length}
							</div>
							<button onClick={() => clearReviewed(DICT_QUEUE_KEY, setDictQueue, dictQueue)} className="text-sm px-3 py-1.5 rounded border" style={{borderColor: '#f1d799', color: '#564c38'}}>Clear Reviewed</button>
						</div>
						{dictQueue.length === 0 ? (
							<p className="text-gray-600">No submissions yet.</p>
						) : (
							<ul className="space-y-3">
								{dictQueue.map(item => (
									<li key={item.id} className="bg-white rounded-lg shadow p-4">
										<div className="flex items-start justify-between">
											<div className="max-w-3xl">
												<div className="text-lg font-semibold">{item.akan} — {item.english}</div>
												<div className="text-sm text-gray-500">{item.partOfSpeech} • {item.dialect} • {item.pronunciation}</div>
												{item.etymology && <div className="text-sm text-gray-600 italic mt-1">{item.etymology}</div>}
												{item.examples && item.examples.length > 0 && (
													<ul className="mt-2 list-disc list-inside text-sm text-gray-700">
														{item.examples.map((ex, i) => (
															<li key={i}>{ex.akan} — {ex.english}</li>
														))}
													</ul>
												)}
											</div>
											<div className="flex items-center space-x-2">
												<span className={`px-2 py-1 rounded text-xs ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : item.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.status}</span>
												<button onClick={() => approve(DICT_QUEUE_KEY, setDictQueue, dictQueue, item.id)} className="px-3 py-1.5 text-sm rounded bg-green-600 text-white">Approve</button>
												<button onClick={() => rejectItem(DICT_QUEUE_KEY, setDictQueue, dictQueue, item.id)} className="px-3 py-1.5 text-sm rounded bg-red-600 text-white">Reject</button>
											</div>
										</div>
									</li>
								))}
							</ul>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default AdminModeration;