import constructionSite from "../../assets/construction-sunset.webp";
import planningDesk from "../../assets/construction-planning.webp";

const panels = {
  "sign-in": {
    image: constructionSite,
    title: "Back on site.",
    description: "Pick up where you left off with your projects, materials and team.",
  },
  "sign-up": {
    image: planningDesk,
    title: "Build with WASLA.",
    description: "Bring your project, supply materials or apply to join a team.",
  },
};

function BrandingPanel({ mode }) {
  const { title, description } = panels[mode];
  return (
    <figure className="branding-panel">
      <div className="branding-photo" aria-hidden="true">
        {Object.entries(panels).map(([name, { image }]) => (
          <img key={name} src={image} alt="" data-mode={name} data-active={name === mode} />
        ))}
      </div>
      <figcaption className="branding-caption">
        <h2>{title}</h2>
        <p>{description}</p>
      </figcaption>
    </figure>
  );
}

export default BrandingPanel;
