import { useState, useEffect, useCallback } from 'react';
import {
  Database,
  Mail,
  Phone,
  Clock,
  Trash2,
  Eye,
  EyeOff,
  ArrowLeft,
  RefreshCw,
  LogOut,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

const API = '';

export default function Admin() {
  const [token, setToken] = useState<string>('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0 });

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contacts?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
        const all = data.data as Contact[];
        setStats({
          total: data.pagination?.total || all.length,
          new: all.filter((c: Contact) => c.status === 'new').length,
          read: all.filter((c: Contact) => c.status === 'read').length,
          replied: all.filter((c: Contact) => c.status === 'replied').length,
        });
      }
    } catch {}
    setLoading(false);
  }, [token]);

  useEffect(() => {
    if (token) fetchContacts();
  }, [token, fetchContacts]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    setLoggingIn(true);
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.data.token);
        setPin('');
      } else {
        setPinError(data.message || 'Invalid PIN');
      }
    } catch {
      setPinError('Connection failed');
    }
    setLoggingIn(false);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API}/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchContacts();
    } catch {}
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Delete this contact?')) return;
    try {
      await fetch(`${API}/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContacts();
    } catch {}
  };

  const logout = () => {
    setToken('');
    setContacts([]);
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (!token) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <a href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to site
          </a>
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Admin Panel</h1>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">StackNova Labs</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-zinc-400 text-[10px] uppercase tracking-widest font-semibold mb-2 block">6-Digit PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setPinError(''); }}
                  placeholder="• • • • • •"
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white text-center text-2xl tracking-[0.5em] font-bold focus:border-brand-red outline-none transition-colors"
                  autoFocus
                />
              </div>
              {pinError && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 px-3 py-2 rounded-lg">
                  <AlertCircle size={14} />
                  {pinError}
                </div>
              )}
              <button type="submit" disabled={pin.length !== 6 || loggingIn} className="w-full py-3 bg-brand-red text-white font-bold text-sm rounded-xl hover:bg-brand-red-dark transition-colors disabled:opacity-40 uppercase tracking-widest">
                {loggingIn ? 'Verifying...' : 'Access Panel'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="bg-zinc-900 border-b border-white/5 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="" className="w-8 h-8 rounded-lg object-cover border border-white/10" />
            <div>
              <h1 className="text-white font-bold text-sm">Admin Panel</h1>
              <p className="text-zinc-500 text-[9px] uppercase tracking-widest">Contact Submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchContacts} className="p-2 text-zinc-400 hover:text-white transition-colors" title="Refresh">
              <RefreshCw size={16} />
            </button>
            <a href="/" className="p-2 text-zinc-400 hover:text-white transition-colors" title="View site">
              <Eye size={16} />
            </a>
            <button onClick={logout} className="p-2 text-zinc-400 hover:text-red-400 transition-colors" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total', value: stats.total, color: 'text-white' },
            { label: 'New', value: stats.new, color: 'text-brand-red' },
            { label: 'Read', value: stats.read, color: 'text-blue-400' },
            { label: 'Replied', value: stats.replied, color: 'text-green-400' },
          ].map((s) => (
            <div key={s.label} className="bg-zinc-900 border border-white/5 rounded-xl p-4">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-zinc-500 text-[9px] uppercase tracking-widest font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500 text-sm">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-sm">No contacts yet</div>
        ) : (
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c._id} className="bg-zinc-900 border border-white/5 rounded-xl p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-white font-bold text-sm">{c.name}</span>
                      <span className={`text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                        c.status === 'new' ? 'bg-brand-red/10 text-brand-red' :
                        c.status === 'read' ? 'bg-blue-400/10 text-blue-400' :
                        'bg-green-400/10 text-green-400'
                      }`}>{c.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400 mb-3">
                      <span className="flex items-center gap-1"><Mail size={11} /> {c.email}</span>
                      {c.phone && <span className="flex items-center gap-1"><Phone size={11} /> {c.phone}</span>}
                      <span className="flex items-center gap-1"><Clock size={11} /> {fmt(c.createdAt)}</span>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed bg-black/30 rounded-lg p-3 border border-white/5">{c.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {c.status === 'new' && (
                      <button onClick={() => updateStatus(c._id, 'read')} className="px-3 py-1.5 bg-blue-400/10 text-blue-400 text-[10px] font-bold rounded-lg hover:bg-blue-400/20 transition-colors uppercase tracking-wider flex items-center gap-1">
                        <EyeOff size={12} /> Read
                      </button>
                    )}
                    {(c.status === 'new' || c.status === 'read') && (
                      <button onClick={() => updateStatus(c._id, 'replied')} className="px-3 py-1.5 bg-green-400/10 text-green-400 text-[10px] font-bold rounded-lg hover:bg-green-400/20 transition-colors uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle size={12} /> Replied
                      </button>
                    )}
                    <button onClick={() => deleteContact(c._id)} className="px-3 py-1.5 bg-red-400/10 text-red-400 text-[10px] font-bold rounded-lg hover:bg-red-400/20 transition-colors uppercase tracking-wider flex items-center gap-1">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
