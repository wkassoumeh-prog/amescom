import type { Localized } from "./types";

export const home = {
  hero: {
    headline: {
      ar: "أنظمة برمجية تدعم التحول الرقمي في مؤسستك",
    } satisfies Localized<string>,
    supporting: {
      ar: "من إدارة الوثائق ومسارات العمل إلى تشغيل المراكز الطبية، تساعدك حلول أميسكوم على تنظيم المعلومات وتبسيط العمليات ودعم اتخاذ القرار.",
    } satisfies Localized<string>,
    supportingWithFrona: {
      ar: "من إدارة الوثائق ومسارات العمل إلى تشغيل المراكز الطبية وإدارة المخاطر، تساعدك حلول أميسكوم على تنظيم المعلومات وتبسيط العمليات ودعم اتخاذ القرار.",
    } satisfies Localized<string>,
    useFronaPhrase: true,
    primaryCtaId: "contact",
    secondaryCtaId: "products",
  },
  sections: [
    "hero",
    "products",
    "sectors",
    "strengths",
    "services",
    "engagement",
    "closing-cta",
  ] as const,
  engagement: {
    title: { ar: "كيف نبدأ؟" } satisfies Localized<string>,
    body: {
      ar: "نناقش احتياج مؤسستك، نختار الحل المناسب، ثم نتفق على خطوات التنفيذ والدعم. مسار التنفيذ يُحدَّد حسب المنتج والسياق، ولا يُعرض هنا كعقد موحّد لكل الأنظمة.",
    } satisfies Localized<string>,
  },
  closing: {
    title: { ar: "تواصل مع أميسكوم" } satisfies Localized<string>,
    body: {
      ar: "أخبرنا عن مؤسستك والمنتج الذي يهمّك، وسيتواصل معك فريق أميسكوم عبر بيانات التواصل التي تدخلها.",
    } satisfies Localized<string>,
  },
};
