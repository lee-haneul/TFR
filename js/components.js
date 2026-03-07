document.addEventListener("DOMContentLoaded", async () => {
  const components = document.querySelectorAll("[data-component]");

  for (const element of components) {
    const name = element.dataset.component;
    const path = `components/subsystemCards/${name}.html`;

    try {
      const response = await fetch(path);
      const html = await response.text();

      element.innerHTML = html;
    } catch (error) {
      console.error(`Component "${name}" failed to load.`);
    }
  }
});
