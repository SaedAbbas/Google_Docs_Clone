import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./styles/**/*.{css,scss}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        xs: "360px",
      },
    },
    extend: {
      colors: {
        blue: {
          100: "#D6E6FF", // أزرق فاتح جدًا، ناعم ومريح
          400: "#4B8CFF", // أزرق نابض بالحياة، عصري
          500: "#3A7CFF", // أزرق غني، يعطي ثقة
        },
        red: {
          400: "#FF6B6B", // مرجاني دافئ، بديل للأحمر التقليدي
          500: "#FF5555", // مرجاني غامق، جريء بس مش عدواني
        },
        dark: {
          100: "#1A1F2E", // داكن مع لمسة معدنية ناعمة
          200: "#252B42", // رمادي داكن دافئ
          300: "#2F3856", // وسطي، مثالي للخلفيات
          350: "#3B4668", // داكن مع إحساس بالفخامة
          400: "#4A5678", // للعناصر الثانوية
          500: "#5A688A", // أفتح قليلاً للتباين
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      backgroundImage: {
        doc: "url(/assets/images/doc.png)",
        modal: "url(/assets/images/modal.png)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
