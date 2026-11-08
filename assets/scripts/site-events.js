/* Public page and link observations shared with the GA4 adapter. */
(() => {
  const observations = [];
  const search = window.location.search || '';
  const parameters = new URLSearchParams(search);
  const campaign = {};
  for (const [query, field] of [
    ['utm_id', 'campaignId'],
    ['utm_campaign', 'campaignName'],
    ['utm_source', 'campaignSource'],
    ['utm_medium', 'campaignMedium'],
    ['utm_term', 'campaignTerm'],
    ['utm_content', 'campaignContentVariant'],
  ]) {
    const value = parameters.get(query)?.trim();
    if (value) campaign[field] = value;
  }
  if (!campaign.campaignId && campaign.campaignName) campaign.campaignId = campaign.campaignName;

  const emit = (name, details = {}) => {
    const payload = Object.freeze({
      event: name,
      pageId: window.location.pathname,
      path: `${window.location.pathname}${search}`,
      timestamp: new Date().toISOString(),
      ...(document.referrer ? { referrer: document.referrer } : {}),
      ...campaign,
      ...details,
    });
    observations.push(payload);
    document.dispatchEvent(new CustomEvent('sibryl:event', { detail: payload }));
  };

  window.sibrylEventLayer = { events: observations, emit };
  emit('public_page_viewed');

  document.addEventListener('click', (clickEvent) => {
    const target = clickEvent.target.closest?.('a[data-event]');
    if (!target) return;
    emit(target.dataset.event, {
      placement: target.dataset.eventPlacement,
      label: target.textContent.trim(),
      href: target.getAttribute('href'),
    });
  });
})();
