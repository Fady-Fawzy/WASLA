// Introduces WASLA with a jobsite photograph and a short product description.

function BrandingPanel() {
  return (
    <figure className="branding-panel">
      <div className="branding-photo" aria-hidden="true" />
      <figcaption className="branding-caption">
        <h2>From plans to progress.</h2>
        <p>Manage construction projects, materials, and teams in one workspace.</p>
      </figcaption>
    </figure>
  );
}

export default BrandingPanel;
