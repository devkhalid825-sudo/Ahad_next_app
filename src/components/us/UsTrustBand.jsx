import { FaCheck } from '@/components/ui/Icons';

const UsTrustBand = ({ items = [] }) => (
  <div className="us-trustband">
    <div className="us-container us-trustband-inner">
      {items.map((it, i) => (
        <div key={i} className="us-trustband-item">
          <span className="us-trustband-check"><FaCheck /></span>
          <span><b>{it.label}</b>{it.desc ? ` ${it.desc}` : ''}</span>
        </div>
      ))}
    </div>
  </div>
);

export default UsTrustBand;
