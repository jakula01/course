import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export function useTimeAgo(dateString) {
  const { t } = useTranslation();

  return useMemo(() => {
    if (!dateString) return "-";

    const date = new Date(dateString.replace(" ", "T"));
    if (isNaN(date)) return "-";

    const diffSec = Math.floor((Date.now() - date) / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return t("lessMinAgo");
    if (diffMin < 60) return `${diffMin} ${t("mAgo")}`;
    if (diffHrs < 24) return `${diffHrs} ${t("hAgo")}`;
    return `${diffDays} ${t("dAgo")}`;
  }, [dateString, t]);
}
