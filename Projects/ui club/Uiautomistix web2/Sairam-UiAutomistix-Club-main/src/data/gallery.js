/**
 * gallery.js — Sairam UiAutomistix Club
 *
 * Single source of truth for the Gallery section's images.
 *
 * Schema:
 * {
 *   id: string,
 *   imageUrl: string,
 *   title: string,
 *   category: "Events" | "Workshops" | "Team" | "Competitions" | "Activities"
 * }
 *
 * Easy Replacement:
 *   When official club photographs are ready, simply upload them to public folders
 *   (e.g., public/assets/gallery/) and replace the `imageUrl` paths below.
 */
export const galleryImages = [
  {
    id: "gallery-1",
    imageUrl: "/assets/gallery/gallery-1.svg",
    title: "Skill-A-Thon Showcase",
    category: "Events"
  },
  {
    id: "gallery-2",
    imageUrl: "/assets/gallery/gallery-2.svg",
    title: "UiPath Hands-On Lab",
    category: "Workshops"
  },
  {
    id: "gallery-3",
    imageUrl: "/assets/gallery/gallery-3.svg",
    title: "Club Executive Team",
    category: "Team"
  },
  {
    id: "gallery-4",
    imageUrl: "/assets/gallery/gallery-4.svg",
    title: "National Automation Hackathon",
    category: "Competitions"
  },
  {
    id: "gallery-5",
    imageUrl: "/assets/gallery/gallery-5.svg",
    title: "Weekly Innovation Meetups",
    category: "Activities"
  },
  {
    id: "gallery-6",
    imageUrl: "/assets/gallery/gallery-6.svg",
    title: "Automation SDG Idea Pitch",
    category: "Events"
  },
  {
    id: "gallery-7",
    imageUrl: "/assets/gallery/gallery-7.svg",
    title: "Intelligent RPA Boot Camp",
    category: "Workshops"
  },
  {
    id: "gallery-8",
    imageUrl: "/assets/gallery/gallery-8.svg",
    title: "RPA Community Outreach",
    category: "Activities"
  }
];
