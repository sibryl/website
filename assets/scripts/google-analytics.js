/* GA4 adapter for Sibryl's public page, campaign, and link observations. */
(() => {
  const measurementId = document.documentElement.dataset.analyticsMeasurementId;
  if (!measurementId) return;

  const search = window.location.search || '';
  const parameters = new URLSearchParams(search);
  const pageLocation = `${window.location.origin}${window.location.pathname}${search}`;
  const pageReferrer = document.referrer;
  const campaignFields = [
    ['utm_id', 'campaign_id'],
    ['utm_campaign', 'campaign_name'],
    ['utm_source', 'campaign_source'],
    ['utm_medium', 'campaign_medium'],
    ['utm_term', 'campaign_term'],
    ['utm_content', 'campaign_content'],
  ];
  const campaign = {};
  for (const [query, field] of campaignFields) {
    const value = parameters.get(query)?.trim();
    if (value) campaign[field] = value;
  }
  if (!campaign.campaign_id && campaign.campaign_name) campaign.campaign_id = campaign.campaign_name;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    ...campaign,
    page_location: pageLocation,
    ...(pageReferrer ? { page_referrer: pageReferrer } : {}),
    send_page_view: false,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  const sentEvents = new WeakSet();
  const send = (payload) => {
    if (!payload || sentEvents.has(payload)) return;
    if (!['public_page_viewed', 'public_navigation_selected', 'public_cta_selected'].includes(payload.event)) return;
    sentEvents.add(payload);
    const details = {
      page_location: pageLocation,
      ...(pageReferrer ? { page_referrer: pageReferrer } : {}),
      ...campaign,
      ...(payload.placement ? { placement: payload.placement } : {}),
      ...(payload.label ? { label: payload.label } : {}),
      ...(payload.href ? { href: payload.href } : {}),
    };
    window.gtag('event', payload.event, details);
    if (payload.event === 'public_page_viewed') window.gtag('event', 'page_view', details);
  };

  document.addEventListener('sibryl:event', (event) => send(event.detail));
  for (const payload of window.sibrylEventLayer?.events ?? []) send(payload);
})();
