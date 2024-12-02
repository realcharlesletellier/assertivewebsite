// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "Pricing", url: "/pricing" },
  // { name: "Services", url: "/services" },
  // { name: "Blog", url: "/blog" },
  { name: "Contact", url: "/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Product",
    links: [
      { name: "Assertive AI", url: "#" },
      // { name: "Community Edition", url: "#" },
      // { name: "Documentation", url: "/welcome-to-docs/" },
      { name: "Pricing", url: "/pricing" },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "About us", url: "#" },
      // { name: "Blog", url: "#" },
      { name: "Contact", url: "/contact" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  // facebook: "https://www.facebook.com/",
  // x: "https://twitter.com/",
  // github: "https://github.com/mearashadowfax/ScrewFast",
  // google: "https://www.google.com/",
  // slack: "https://slack.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};