import ScrollVideoFrame from '@/app/features/ScrollVideoFrame';
 
// export const metadata = {
//   title: 'Works',
// };
//  
export default function Works() {
  return (
    <main>
      {/* ─── Scroll-jacked video showcase ─────────────────────────────────── */}
      <ScrollVideoFrame />
 
      {/* ─── Rest of your Works content below ──────────────────────────────
          The scroll lock auto-releases once the user passes the last video,
          so everything below scrolls normally.
      ──────────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 2rem', background: '#fff', color: '#fff' }}>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>
          {/* Your project grid, case studies, etc. go here */}
          More works content…
        </p>
      </section>
    </main>
  );
}