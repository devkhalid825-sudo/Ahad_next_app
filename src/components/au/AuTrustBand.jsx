import { FaCheck } from '@/components/ui/Icons';

const AuTrustBand = ({ items = [] }) => (
  <div className="au-trustband">
    <div className="au-container au-trustband-inner">
      {items.map((it, i) => (
        <div key={i} className="au-trustband-item">
          <span className="au-trustband-check"><FaCheck /></span>
          <span><b>{it.label}</b>{it.desc ? ` ${it.desc}` : ''}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AuTrustBand;
