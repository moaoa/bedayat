import i18n from "@/core/plugins/i18n";
const mapIndexToSectionLabel = (index: number): string => {
  switch (index) {
    case 1:
      return i18n.global.t("firstSection");
    case 2:
      return i18n.global.t("secondSection");
    case 3:
      return i18n.global.t("thirdSection");
    default:
      return "section Index not found";
  }
};

export default mapIndexToSectionLabel;
