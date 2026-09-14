import { FaCheck } from '@/components/ui/Icons';

const UkTrustBand = ({ items = [] }) => (
  <div className="uk-trustband">
    <div className="uk-container uk-trustband-inner">
      {items.map((it, i) => (
        <div key={i} className="uk-trustband-item">
          <span className="uk-trustband-check"><FaCheck /></span>
          <span><b>{it.label}</b>{it.desc ? ` ${it.desc}` : ''}</span>
        </div>
      ))}
    </div>
  </div>
);

export default UkTrustBand;
