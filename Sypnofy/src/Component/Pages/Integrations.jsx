import { useState, useEffect } from 'react'
import { Plug, ExternalLink, Loader2 } from 'lucide-react'
import StatusBadge from '../StatusBadge'
import { getAllIntegrations, toggleIntegrationStatus } from '../../api/integrationApi'

export default function Integrations() {
  const [integrations, setIntegrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [togglingId, setTogglingId] = useState(null)

  const loadIntegrations = () => {
    setLoading(true)
    getAllIntegrations()
      .then((res) => {
        setIntegrations(res.data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)
        setError('Could not load integrations. Is the backend running?')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadIntegrations()
  }, [])

  const grouped = integrations.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const handleToggle = async (id) => {
    setTogglingId(id)
    try {
      await toggleIntegrationStatus(id)
      loadIntegrations()
    } catch (err) {
      console.error(err)
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Plug size={20} className="text-slate-900" />
          Integrations
        </h1>
        <p className="text-sm text-slate-500">Adapter-based connections — swap providers without changing the core platform</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 py-12">
          <Loader2 size={18} className="animate-spin" />
          Loading integrations...
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-sm text-red-600 bg-red-50 rounded-xl py-8 px-4">{error}</div>
      )}

      {!loading && !error && integrations.length === 0 && (
        <div className="text-center text-sm text-slate-400 py-12">
          No integrations yet. Add some via the API to see them here.
        </div>
      )}

      {!loading && !error && integrations.length > 0 && (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="bg-white rounded-xl shadow border border-slate-100 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
                <h2 className="font-semibold text-slate-800 text-sm">{category}</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <Plug size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={item.status} />
                      <button
                        onClick={() => handleToggle(item.id)}
                        disabled={togglingId === item.id}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:underline disabled:opacity-50"
                      >
                        {togglingId === item.id
                          ? 'Updating...'
                          : item.status === 'Active' ? 'Disconnect' : 'Connect'}
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}