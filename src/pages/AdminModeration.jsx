import React from 'react';

const MOD_QUEUE_KEY = 'akan:moderation-queue:culture';

const AdminModeration = () => {
	const [queue, setQueue] = React.useState([]);

	React.useEffect(() => {
		try {
			const raw = localStorage.getItem(MOD_QUEUE_KEY);
			setQueue(raw ? JSON.parse(raw) : []);
		} catch {
			setQueue([]);
		}
	}, []);

	const updateQueue = (nextQueue) => {
		setQueue(nextQueue);
		try {
			localStorage.setItem(MOD_QUEUE_KEY, JSON.stringify(nextQueue));
		} catch {}
	};

	const approve = (id) => {
		updateQueue(queue.map(item => item.id === id ? { ...item, status: 'approved', reviewedAt: new Date().toISOString() } : item));
	};

	const rejectItem = (id) => {
		updateQueue(queue.map(item => item.id === id ? { ...item, status: 'rejected', reviewedAt: new Date().toISOString() } : item));
	};

	const clearReviewed = () => {
		updateQueue(queue.filter(item => item.status === 'pending'));
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Moderation Queue</h1>
				<div className="bg-white rounded-lg shadow p-4 mb-4 flex items-center justify-between">
					<div>
						<span className="font-medium">Total:</span> {queue.length}
						<span className="ml-4 text-yellow-700">Pending:</span> {queue.filter(q => q.status === 'pending').length}
					</div>
					<button onClick={clearReviewed} className="text-sm px-3 py-1.5 rounded border" style={{borderColor: '#f1d799', color: '#564c38'}}>Clear Reviewed</button>
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
										<button onClick={() => approve(item.id)} className="px-3 py-1.5 text-sm rounded bg-green-600 text-white">Approve</button>
										<button onClick={() => rejectItem(item.id)} className="px-3 py-1.5 text-sm rounded bg-red-600 text-white">Reject</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default AdminModeration;