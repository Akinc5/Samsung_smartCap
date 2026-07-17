import { ExternalLink } from 'lucide-react';
import { featuredProducts } from '../data/discoverProducts';

export function Discover() {
  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <header className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="inline-block bg-[#3498DB] border-4 border-[#2D3436] rounded-2xl px-6 py-2 shadow-[0_6px_0_0_#2D3436] transform -rotate-1">
          <h1
            className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase"
            style={{ WebkitTextStroke: '1.5px #2D3436' }}
          >
            Discover
          </h1>
        </div>
        <p className="text-lg font-bold text-slate-600 bg-white px-4 py-1 rounded-full border-2 border-slate-300 shadow-sm">
          Real Samsung models — specs shown here, current pricing on Samsung.com
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featuredProducts.map((product) => {
          const Icon = product.icon;
          return (
            <div key={product.id} className="toy-card p-6 flex flex-col gap-4">
              <div
                className="w-20 h-20 rounded-full border-4 border-[#2D3436] flex items-center justify-center bg-white shrink-0 mx-auto shadow-[0_6px_0_0_#2D3436]"
              >
                <Icon className="w-10 h-10" style={{ color: product.accent }} />
              </div>

              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {product.category}
                </span>
                <h3 className="font-black text-[#2D3436] text-lg leading-tight">{product.name}</h3>
                <p className="text-xs font-bold text-slate-400">{product.model}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {product.specs.map((spec) => (
                  <span
                    key={spec}
                    className="bg-[#F1F2F6] border-2 border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-[#2D3436]"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl border-4 border-[#2D3436] text-sm font-black uppercase bg-[#3498DB] text-white shadow-[0_8px_0_0_#2D3436] hover:translate-y-1 hover:shadow-[0_4px_0_0_#2D3436] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-2 mt-auto"
              >
                View on Samsung.com <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
