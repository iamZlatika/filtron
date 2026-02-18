interface GtmEvent {
  event: string;
  page_name?: string;
  [key: string]: unknown;
}

interface Window {
  dataLayer: GtmEvent[];
}
