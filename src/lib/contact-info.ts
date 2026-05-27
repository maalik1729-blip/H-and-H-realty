export const CONTACT = {
  phone: (import.meta.env.VITE_PHONE as string) ?? "+91 98765 43210",
  phoneRaw: (import.meta.env.VITE_PHONE_RAW as string) ?? "919876543210",
  email: (import.meta.env.VITE_EMAIL as string) ?? "hello@hnhrealty.in",
  address: "No. 45, OMR Road, Sholinganallur, Chennai 600119",
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(message)}`;
