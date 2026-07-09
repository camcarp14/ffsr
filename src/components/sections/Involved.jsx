import { ORG } from '../../lib/flock.js';
import { useReveal } from '../../lib/motion.js';

const WAYS = [
  {
    title: 'Volunteer',
    lead: 'Chop brigade, cage crew, event hands, bird socializers.',
    body: 'No experience required — we\'ll teach you which end bites. A few hours a month genuinely changes these birds\' days.',
    cta: 'Raise your hand',
    mail: `mailto:${ORG.email}?subject=${encodeURIComponent('Volunteering at Feathered Friends')}`,
  },
  {
    title: 'Surrender',
    lead: 'Life changes. We know — that\'s why we exist.',
    body: 'If you can no longer keep your bird, bring them to us without judgment. No lectures, no fees shame, no questions you\'re afraid of. Just a soft landing.',
    cta: 'Talk to us first',
    mail: `mailto:${ORG.email}?subject=${encodeURIComponent('Surrendering a bird')}`,
  },
  {
    title: 'Boarding',
    lead: 'Going away? Your bird can flock with ours.',
    body: 'Experienced parrot people, proper cages, daily enrichment, and your care routine followed to the letter. Book early — summers fill fast.',
    cta: 'Check availability',
    mail: `mailto:${ORG.email}?subject=${encodeURIComponent('Boarding inquiry')}`,
  },
];

export default function Involved() {
  const ref = useReveal();
  return (
    <section className="involved" id="involved" ref={ref}>
      <div className="rail">
        <p className="kicker" data-reveal>
          Get involved
        </p>
        <h2 data-reveal style={{ '--d': '120ms' }}>
          Three more ways to <em>matter to a bird.</em>
        </h2>
        <div className="ways stagger">
          {WAYS.map((w) => (
            <article className="way" key={w.title}>
              <h3>{w.title}</h3>
              <p className="way-lead">{w.lead}</p>
              <p className="way-body">{w.body}</p>
              <a className="btn btn-line" href={w.mail}>
                {w.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
