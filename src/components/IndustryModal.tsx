"use client";

import ServiceDetailPage, { ServiceKey } from "@/components/ServiceDetailPage";

interface IndustryModalProps {
  industryKey: ServiceKey | null;
  onClose: () => void;
  onRequestForIndustry: (industryName: string) => void;
  onSwitchService?: (serviceKey: ServiceKey) => void;
}

export default function IndustryModal({
  industryKey,
  onClose,
  onRequestForIndustry,
  onSwitchService,
}: IndustryModalProps) {
  return (
    <ServiceDetailPage
      serviceKey={industryKey}
      onClose={onClose}
      onRequestForIndustry={onRequestForIndustry}
      onSwitchService={onSwitchService}
    />
  );
}
