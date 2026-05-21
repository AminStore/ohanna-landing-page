import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "ar";

const translations = {
  en: {
    nav: {
      collection: "COLLECTION",
      story: "STORY",
      culture: "CULTURE",
      contact: "CONTACT",
    },
    notif: {
      title: "Notifications",
      markAll: "Mark all read",
      n1Title: "New Drop!",
      n1Msg: "ANKH TEE restocked — limited units",
      n1Time: "2h ago",
      n2Title: "Order Shipped",
      n2Msg: "Order #OHN-1734 is on the way",
      n2Time: "1d ago",
      n3Title: "Flash Sale",
      n3Msg: "20% off all Hoodies this weekend",
      n3Time: "3d ago",
    },
    auth: {
      login: "Login",
      register: "Register",
      loginTitle: "Welcome back",
      registerTitle: "Join OHANNA",
      email: "Email",
      password: "Password",
      fullName: "Full Name",
      forgotPassword: "Forgot password?",
      submitLogin: "Sign In",
      submitRegister: "Create Account",
      loginFooter: "No account yet?",
      registerFooter: "Already have an account?",
    },
  },
  ar: {
    nav: {
      collection: "المجموعة",
      story: "قصتنا",
      culture: "الثقافة",
      contact: "تواصل",
    },
    notif: {
      title: "الإشعارات",
      markAll: "تعيين الكل كمقروء",
      n1Title: "وصول جديد!",
      n1Msg: "تيشيرت ANKH عاد — كميات محدودة",
      n1Time: "منذ ساعتين",
      n2Title: "تم الشحن",
      n2Msg: "طلبك #OHN-1734 في الطريق إليك",
      n2Time: "منذ يوم",
      n3Title: "تخفيضات سريعة",
      n3Msg: "خصم 20% على الهوديز نهاية الأسبوع",
      n3Time: "منذ 3 أيام",
    },
    auth: {
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      loginTitle: "مرحباً بعودتك",
      registerTitle: "انضم إلى أوهانا",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      fullName: "الاسم الكامل",
      forgotPassword: "نسيت كلمة المرور؟",
      submitLogin: "دخول",
      submitRegister: "إنشاء الحساب",
      loginFooter: "ليس لديك حساب؟",
      registerFooter: "لديك حساب بالفعل؟",
    },
  },
} as const;

type TranslationKey = string;

function getNestedValue(obj: Record<string, unknown>, keys: string[]): string {
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object") {
      current = (current as Record<string, unknown>)[key];
    } else {
      return keys.join(".");
    }
  }
  return typeof current === "string" ? current : keys.join(".");
}

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("ohanna-lang") as Lang | null;
      if (saved === "en" || saved === "ar") return saved;
    } catch {}
    return "en";
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (lang === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      body.classList.add("font-arabic");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      body.classList.remove("font-arabic");
    }
    try {
      localStorage.setItem("ohanna-lang", lang);
    } catch {}
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));

  const t = (key: TranslationKey): string => {
    const keys = key.split(".");
    return getNestedValue(
      translations[lang] as unknown as Record<string, unknown>,
      keys
    );
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t, isRTL: lang === "ar" }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
