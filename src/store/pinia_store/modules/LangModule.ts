import { defineStore } from "pinia";

import { language } from "@/types/lang";
import en from "element-plus/packages/locale/lang/en";
import ar from "element-plus/packages/locale/lang/ar";
import i18n from "@/core/plugins/i18n";
import LanguageDefaultConfig from "@/core/config/LanguageDefaultConfig";

export const useLangStore = defineStore({
  id: "langStore",

  state: () => ({
    lang: LanguageDefaultConfig.defaultLanguage as language,
    langTitle: "العربية" as string,
    langFlagPath: "/media/flags/libya.svg" as string,
    OtherLangFlagPath: "/media/flags/united-state.svg" as string,
    elementPlusLocale: ar as Record<string, unknown>,
  }),

  actions: {
    setLang(lang: language) {

      if (lang === "ar") {
        this.elementPlusLocale = ar;
        this.langTitle="اللغة العربية";
        this.langFlagPath="/media/flags/libya.svg";
        this.OtherLangFlagPath="/media/flags/united-states.svg";

      } else {
        this.elementPlusLocale = en;
        this.langTitle="English Language";
        this.langFlagPath="/media/flags/united-states.svg";
        this.OtherLangFlagPath="/media/flags/libya.svg";
      }
      this.lang = lang;
      i18n.global.locale.value = this.lang;
    },
    switchLang() {
      if (this.lang=="ar")
        this.setLang("en")
      else
        this.setLang("ar")

    }
  },
});
