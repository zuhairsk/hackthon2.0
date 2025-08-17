export default function Profile() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
        <h3 className="font-semibold mb-3">User Info</h3>
        <div className="text-sm text-white/80 space-y-1">
          <div><span className="text-white/60">Username:</span> you</div>
          <div><span className="text-white/60">Email:</span> you@example.com</div>
          <div><span className="text-white/60">Level:</span> Intermediate</div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Badges</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-cyan-600/30 border border-cyan-500/30">Debugger</span>
            <span className="px-2 py-1 rounded bg-amber-600/30 border border-amber-500/30">Speedster</span>
            <span className="px-2 py-1 rounded bg-emerald-600/30 border border-emerald-500/30">Helper</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Progress</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs"><span>Beginner</span><span>100%</span></div>
              <div className="h-2 bg-white/10 rounded"><div className="h-2 bg-emerald-500 rounded" style={{ width: '100%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-xs"><span>Intermediate</span><span>60%</span></div>
              <div className="h-2 bg-white/10 rounded"><div className="h-2 bg-cyan-500 rounded" style={{ width: '60%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-xs"><span>Pro</span><span>20%</span></div>
              <div className="h-2 bg-white/10 rounded"><div className="h-2 bg-fuchsia-500 rounded" style={{ width: '20%' }} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}