export default function (limit, ignores) {
  return `w.scan = () => {
    const allInternalLinks = Array.from(d.links).filter(
      (link) =>
        link.host === l.host &&
        !link.hash &&
        !link.hasAttribute("download") &&
        link.target !== "_blank" ${
          ignores
            ? "&& ignores.includes(link.href) && ignores.includes(link.pathname)"
            : ""
        }
    );
  
    const newInternalLinks = allInternalLinks.filter(
      (link) => !internalLinks.includes(link)
    );
  
    ${limit ? "newInternalLinks.splice(limit - internalLinks.length)" : ""}

    newInternalLinks.forEach((link) => {
      observe(link);
    })
  
    internalLinks.push(...newInternalLinks);
  };`;
}