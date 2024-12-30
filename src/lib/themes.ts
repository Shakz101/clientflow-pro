export type Theme = {
  id: string;
  name: string;
  description: string;
  gradient: string;
  preview: string;
};

export const themes: Theme[] = [
  {
    id: "default",
    name: "Light Blue",
    description: "Default theme with a calming blue gradient",
    gradient: "bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100 text-gray-800",
    preview: "bg-gradient-to-br from-blue-200 via-sky-200 to-cyan-200",
  },
  {
    id: "purple",
    name: "Purple Dream",
    description: "Rich purple tones for a modern look",
    gradient: "bg-gradient-to-br from-purple-100 via-violet-100 to-indigo-100 text-gray-800",
    preview: "bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200",
  },
  {
    id: "pastel",
    name: "Soft Pastel",
    description: "Gentle pastel colors for a soothing experience",
    gradient: "bg-gradient-to-br from-rose-100 via-fuchsia-100 to-pink-100 text-gray-800",
    preview: "bg-gradient-to-br from-rose-200 via-fuchsia-200 to-pink-200",
  },
  {
    id: "light",
    name: "Clean White",
    description: "Minimalist white theme with subtle accents",
    gradient: "bg-white text-gray-800",
    preview: "bg-gray-100",
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Elegant dark theme for reduced eye strain",
    gradient: "bg-gray-900 text-gray-100",
    preview: "bg-gray-800",
  },
];

export const getTheme = (themeId: string): Theme => {
  return themes.find((theme) => theme.id === themeId) || themes[0];
};