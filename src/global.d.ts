interface GtmEvent {
  event: string;
  page_name?: string;
  [key: string]: any;
}

interface Window {
  dataLayer: GtmEvent[];
}
