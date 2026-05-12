/** Filename under `public/images/parceiros` (matched to assets on disk). */
export type Partner = {
  readonly name: string;
  readonly category: string;
  readonly logoFile: string;
};

export function partnerLogoSrc(logoFile: string): string {
  return `/images/parceiros/${encodeURIComponent(logoFile)}`;
}

export const PARTNERS: readonly Partner[] = [
  { name: "Knauf", category: "LSF / Placas", logoFile: "Knauf Insulation.svg" },
  {
    name: "Saint-Gobain",
    category: "Isolamentos / Gyproc",
    logoFile: "Saint-Gobain.svg",
  },
  {
    name: "Weber",
    category: "Argamassas / Etics",
    logoFile: "Weber Saint Gobain.svg",
  },
  { name: "Sika", category: "Impermeabilização", logoFile: "Sika.svg" },
  {
    name: "Cimpor / Secil",
    category: "Betão e Cimento",
    logoFile: "Cimpor.svg",
  },
  {
    name: "Fassa Bortolo",
    category: "Revestimentos",
    logoFile: "Fassa Bortolo.svg",
  },
  { name: "Hilti", category: "Fixações LSF", logoFile: "Hilti.svg" },
  { name: "Mapei", category: "Colas e Selantes", logoFile: "Mapei.svg" },
  { name: "Nudura", category: "Blocos ICF", logoFile: "Nudura.svg" },
  { name: "Gyproc", category: "Gesso cartonado", logoFile: "Gyproc.svg" },
] as const;
