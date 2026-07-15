// ============================================================
// SITE CONFIG — Edit this file to customise for any brand.
// No need to touch any other file for content changes.
// ============================================================

export const siteConfig = {
  // ── BRAND ──────────────────────────────────────────────────
  brand: {
    name: "Vamos Provar Thunapaha",
    tagline: "Sri Lankan culinary experience · Lisbon, Portugal",
    description:
      "Cook Sri Lankan food with your hands. Share stories around the table. Taste spices that traveled centuries to reach Lisbon.",
    accentColor: "#E8912A", // Amber Gold — drives CTAs, buttons, hero panel
    accentDark: "#C4621A", // Deep Ember — gradient end stop
    accentMid: "#D4721A", // Burnt Orange — gradient mid stop
    logoEmoji: "🫙",
  },

  // ── HERO ───────────────────────────────────────────────────
  hero: {
    badge: "Cook • Taste • Remember",
    headlineLine1: "Let's taste",
    headlineLine2: "Thunapaha", // rendered with gradient text
    description:
      "Cook Authentic Sri Lankan food with your hands. Share stories around the table. Taste spices that traveled centuries to reach Lisbon.",
    descriptionEmphasis: "This isn't just a meal, it's memory-making.",
    ctaPlaceholder: "your@email.com",
    ctaButton: "Join Waitlist",
    successMessage:
      "❤️ Thanks for registering — we'll send you an email shortly!",
    ctaSubline: "Next experience in Lisbon",
    visualCaption: "",
    images: [
      "/images/slide-image.jpg",
      "/images/slide-image-1.jpg",
      "/images/slide-image-2.jpg",
      "/images/slide-image-3.jpg",
      "/images/slide-image-4.jpg",
      "/images/slide-image-5.jpg",
    ],
  },

  // ── EXPERIENCE STEPS ───────────────────────────────────────
  experience: {
    sectionLabel: "The Experience",
    subline:
      "Three hours that turn unfamiliar ingredients into familiar memories.",
    steps: [
      {
        icon: "flame", // maps to <Flame> from lucide-react
        title: "Cook Together",
        description:
          "Harshika teaches. You do. Nobody watches from the sidelines—everyone has a job. Grind spices. Fry onions until golden. Feel the heat from the clay pot.",
        items: [
          "New year sweets",
          "Fresh-ground pol sambol",
          "Perfectly spiced dhal",
        ],
        gradient:
          "linear-gradient(135deg, #D4A574 0%, rgba(212,165,116,0.7) 100%)",
        glowColor: "rgba(212,165,116,0.3)",
      },
      {
        icon: "heart", // maps to <Heart> from lucide-react
        title: "Eat What We Made",
        description:
          "Sit. Talk. Eat slowly. This is the part where food gets cold because the stories are too good to stop. Every dish carries a story—from Sri Lanka, from Harshika's family, now yours.",
        quote:
          "TunaPaha means 'five spices'—the foundation of all Sri Lankan cooking. It's the secret Harshika's grandmother never wrote down.",
        gradient:
          "linear-gradient(135deg, #2D5016 0%, rgba(45,80,22,0.8) 100%)",
        glowColor: "rgba(45,80,22,0.3)",
      },
    ],
  },

  // ── HOST / PRESENTER ───────────────────────────────────────
  host: {
    badge: "The Cook",
    image: "/images/meet-harshika.jpeg",
    name: "Meet Harshika",
    bio: [
      "She's not a trained chef. She's a researcher. Someone who spent years recreating grandmother's recipes from memory, testing temperatures, asking questions the cookbooks don't answer.",
      "Born in a charming coastal town in Sri Lanka. Now in Lisbon. Bringing home flavors to Portuguese tables—not as a restaurant, but as an experience. As shared memory.",
    ],
    quote:
      "When you eat with your hands, food tastes different. More truthful. That's how we're meant to eat rice & curry.",
    portraitPlaceholder: "Harshika portrait\ncoming soon",
  },

  // ── MENU / DISHES ──────────────────────────────────────────
  menu: {
    sectionLabel: "What We Make",
    subline: "Every dish is a lesson. Every bite is a story from the island.",
    dishes: [
      {
        emoji: "🥘",
        image: "/images/kokiss-yellow.png",
        title: "Kokiss",
        description:
          "Crispy, deep-fried rice flour cookies, traditionally made during festive occasions in Sri Lanka.",
        accent: "#E8912A",
        bg: "linear-gradient(135deg, #FFF3DC 0%, #FFE5B0 100%)",
      },
      {
        emoji: "🥥",
        image: "/images/pol-sambol.png",
        title: "Pol Sambol",
        description:
          "Fresh coconut ground with red onion, chilli and lime. The condiment that goes on everything—and makes everything better.",
        accent: "#2D5016",
        bg: "linear-gradient(135deg, #F0F7E8 0%, #D8EFC0 100%)",
      },
      {
        emoji: "🍛",
        image: "/images/dhal-curry.jpg",
        title: "Dhal Curry",
        description:
          "Red lentils slow-cooked with turmeric, mustard seeds, curry leaves and coconut milk. Grandmother's weekly ritual.",
        accent: "#C4621A",
        bg: "linear-gradient(135deg, #FFF0E0 0%, #FFD8A8 100%)",
      },
      {
        emoji: "🫙",
        image: "/images/thuna-paha.jpeg",
        title: "TunaPaha Spice Blend",
        description:
          "The homemade five-spice blend at the heart of it all. You'll grind it yourself, and take the recipe home.",
        accent: "#5D3A3A",
        bg: "linear-gradient(135deg, #F7F0EE 0%, #EDD8D0 100%)",
      },
      {
        emoji: "🫙",
        image: "/images/string-hoppers.jpeg",
        title: "String Hoppers",
        description:
          "Steamed rice flour noodles, traditionally served with coconut sambol and curry. A staple of Sri Lankan cuisine.",
        accent: "#5D3A3A",
        bg: "linear-gradient(135deg, #F7F0EE 0%, #EDD8D0 100%)",
      },
      {
        emoji: "🫙",
        image: "/images/rotti.png",
        title: "Pol Rotti",
        description:
          "Sri Lankan flatbread made from grated coconut and wheat flour, typically served with curry.",
        accent: "#ebd5d5",
        bg: "linear-gradient(135deg, #F7F0EE 0%, #EDD8D0 100%)",
      },
    ],
  },

  // ── FAQ ────────────────────────────────────────────────────
  faq: {
    headline: "Questions? Good.",
    subline: "Curious people make the best cooking partners.",
    items: [
      {
        q: "Do I need to know how to cook?",
        a: "Absolutely not. This is for curious eaters, not trained chefs. Harshika guides every step—you just need to show up with an appetite.",
      },
      {
        q: "How many people per session?",
        a: "We keep it small and intimate—minimum 6 guests per experience. This isn't a cooking class; it's a dinner party where you help make the food.",
      },
      {
        q: "What does the experience include?",
        a: "Everything. A full cooking session with Harshika, all ingredients and equipment, the shared meal you cooked together, drinks, and the TunaPaha spice blend recipe to take home.",
      },
      {
        q: "Are there vegetarian or vegan options?",
        a: "Yes. Sri Lankan cuisine is naturally rich in plant-based dishes. Let us know your dietary needs when you join the waitlist and we'll tailor the menu.",
      },
      {
        q: "Where do the experiences happen?",
        a: "In Lisbon. Exact location is shared with confirmed guests. We're working on a permanent home—for now, it's an intimate pop-up setting.",
      },
      {
        q: "When is the next experience?",
        a: "We're targeting {{monthYear}}. Join the waitlist to be first in line—waitlist members get priority booking and an early-bird rate.",
      },
    ],
  },

  // ── CONTACT ────────────────────────────────────────────────
  contact: {
    headline: "Say hello",
    subline:
      "Got a question, a private event in mind, or just want to say you love Sri Lankan food? We'd love to hear from you.",
    details: [
      {
        icon: "📧",
        label: "Email",
        value: "provar-thunapaha@boomatech.io",
        href: "mailto:provar-thunapaha@boomatech.io",
      },
      {
        icon: "📱",
        label: "Instagram",
        value: "@tunapaha.lisbon",
        href: "https://instagram.com/tunapaha.lisbon",
      },
      { icon: "📍", label: "Location", value: "Lisbon, Portugal", href: null },
    ],
  },

  // ── FINAL CTA ──────────────────────────────────────────────
  finalCta: {
    headline: "Ready to cook together?",
    subline:
      "Join the waitlist. Next experiences happen in {{month}}. Limited seats.",
    sublineEmphasis: "Unlimited flavors.",
    ctaPlaceholder: "your@email.com",
    ctaButton: "Secure My Spot",
    successMessage:
      "❤️ Thanks for registering — we'll send you an email shortly!",
  },

  // ── FOOTER ─────────────────────────────────────────────────
  footer: {
    legal: "TunaPaha. All rights reserved.",
    links: [
      // { label: "Privacy Policy", href: "/privacy" },
      // { label: "Instagram", href: "https://instagram.com/tunapaha.lisbon" },
    ],
  },
};
