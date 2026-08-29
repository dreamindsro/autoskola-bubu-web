export function FaqList({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="faq-list">
      {items.map(([question, answer]) => (
        <details className="faq-card" key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
