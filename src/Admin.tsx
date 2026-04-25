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
  ChevronDown,
  ChevronUp,
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

export default function Admin() {
  const [token, setToken] = useState<string>('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contacts?limit=100', {
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
      const res = await fetch('/api/admin/login', {
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
      await fetch(`/api/contacts/${id}`, {
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
      await fetch(`/api/contacts/${id}`, {
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

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  const statusColor = (s: string) =>
    s === 'new' ? 'bg-brand-red/10 text-brand-red' :
    s === 'read' ? 'bg-blue-400/10 text-blue-400' :
    'bg-green-400/10 text-green-400';

  if (!token) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <a href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to site
          </a>
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <h1 className="text-white font-bold text-base">Admin Panel</h1>
                <p className="text-zinc-500 text-[9px] uppercase tracking-widest">StackNova Labs</p>
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
                  placeholder="------"
                  className="w-full px-3 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white text-center text-2xl tracking-[0.4em] font-bold focus:border-brand-red outline-none transition-colors"
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.webp" alt="" className="w-7 h-7 rounded-lg object-cover border border-white/10" />
            <div>
              <h1 className="text-white font-bold text-xs sm:text-sm">Admin Panel</h1>
              <p className="text-zinc-500 text-[8px] sm:text-[9px] uppercase tracking-widest">Submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={fetchContacts} className="p-2 text-zinc-400 hover:text-white transition-colors">
              <RefreshCw size={15} />
            </button>
            <a href="/" className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Eye size={15} />
            </a>
            <button onClick={logout} className="p-2 text-zinc-400 hover:text-red-400 transition-colors">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Total', value: stats.total, color: 'text-white' },
            { label: 'New', value: stats.new, color: 'text-brand-red' },
            { label: 'Read', value: stats.read, color: 'text-blue-400' },
            { label: 'Done', value: stats.replied, color: 'text-green-400' },
          ].map((s) => (
            <div key={s.label} className="bg-zinc-900 border border-white/5 rounded-lg p-2.5 sm:p-3 text-center">
              <div className={`text-lg sm:text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-zinc-500 text-[7px] sm:text-[8px] uppercase tracking-widest font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-zinc-500 text-sm">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16 text-zinc-500 text-sm">No contacts yet</div>
        ) : (
          <div className="space-y-2">
            {contacts.map((c) => {
              const open = expandedId === c._id;
              return (
                <div key={c._id} className="bg-zinc-900 border border-white/5 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedId(open ? null : c._id)}
                    className="w-full px-3 py-3 flex items-center justify-between gap-2 text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded-full shrink-0 ${statusColor(c.status)}`}>{c.status}</span>
                      <span className="text-white font-bold text-xs truncate">{c.name}</span>
                      <span className="text-zinc-600 text-[10px] hidden sm:inline truncate">{c.email}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-zinc-600 text-[9px]">{fmt(c.createdAt)}</span>
                      {open ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
                    </div>
                  </button>

                  {open && (
                    <div className="px-3 pb-3 border-t border-white/5 pt-3">
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-xs text-zinc-300">
                          <Mail size={12} className="text-zinc-500 shrink-0" />
                          <span className="truncate">{c.email}</span>
                        </div>
                        {c.phone && (
                          <div className="flex items-center gap-2 text-xs text-zinc-300">
                            <Phone size={12} className="text-zinc-500 shrink-0" />
                            <a href={`tel:${c.phone}`} className="text-brand-red hover:underline">{c.phone}</a>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <Clock size={12} className="text-zinc-500 shrink-0" />
                          <span>{fmt(c.createdAt)}</span>
                        </div>
                      </div>
                      <div className="text-zinc-300 text-xs leading-relaxed bg-black/30 rounded-lg p-3 border border-white/5 mb-3 whitespace-pre-wrap">{c.message}</div>
                      <div className="flex flex-wrap gap-2">
                        {c.status === 'new' && (
                          <button onClick={() => updateStatus(c._id, 'read')} className="px-3 py-1.5 bg-blue-400/10 text-blue-400 text-[10px] font-bold rounded-lg hover:bg-blue-400/20 transition-colors uppercase tracking-wider flex items-center gap-1">
                            <EyeOff size={11} /> Read
                          </button>
                        )}
                        {(c.status === 'new' || c.status === 'read') && (
                          <button onClick={() => updateStatus(c._id, 'replied')} className="px-3 py-1.5 bg-green-400/10 text-green-400 text-[10px] font-bold rounded-lg hover:bg-green-400/20 transition-colors uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle size={11} /> Replied
                          </button>
                        )}
                        <button onClick={() => deleteContact(c._id)} className="px-3 py-1.5 bg-red-400/10 text-red-400 text-[10px] font-bold rounded-lg hover:bg-red-400/20 transition-colors uppercase tracking-wider flex items-center gap-1">
                          <Trash2 size={11} /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
