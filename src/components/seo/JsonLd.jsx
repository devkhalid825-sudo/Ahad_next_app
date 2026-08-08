import React from 'react';

/**
 * Renders structured data as <script type="application/ld+json">
 */
export function JsonLd({ schema }) {
  if (!schema) return null;
  const jsonString = typeof schema === 'string' ? schema : JSON.stringify(schema);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

export function MultiJsonLd({ schemas = [] }) {
  const validSchemas = schemas.filter(Boolean);
  if (validSchemas.length === 0) return null;
  return (
    <>
      {validSchemas.map((sch, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: typeof sch === 'string' ? sch : JSON.stringify(sch) }}
        />
      ))}
    </>
  );
}

export default JsonLd;
