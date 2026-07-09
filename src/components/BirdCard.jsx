import { speciesFacts } from '../lib/flock.js';
import { FeatherMeter } from './FeatherMeter.jsx';

export default function BirdCard({ bird, onOpen }) {
  const facts = speciesFacts(bird.facts);
  return (
    <button className="bird-card" onClick={() => onOpen(bird)}>
      <div className="bird-photo">
        <img src={bird.photo} alt={`${bird.name}, ${bird.species}`} loading="lazy" />
        {bird.bonded && <span className="bird-ribbon ribbon-gold">Bonded pair</span>}
      </div>
      <div className="bird-meta">
        <span
          className="plumage-stripe"
          aria-hidden="true"
          style={{
            background: `linear-gradient(90deg, ${facts.plumage[0]} 0 34%, ${facts.plumage[1]} 34% 67%, ${facts.plumage[2]} 67% 100%)`,
          }}
        />
        <h3>{bird.name}</h3>
        <p className="bird-species">
          {bird.species} · {bird.age}
        </p>
        <dl className="bird-facts">
          <div>
            <dt>Volume</dt>
            <dd>
              <FeatherMeter level={bird.noise} />
            </dd>
          </div>
          <div>
            <dt>Lives</dt>
            <dd className="num">{facts.lifespanLabel}</dd>
          </div>
          <div>
            <dt>Suits</dt>
            <dd>{bird.exp}</dd>
          </div>
        </dl>
        <span className="bird-more">Meet {bird.name.split(' ')[0].replace(/[',]$/, '')} →</span>
      </div>
    </button>
  );
}
