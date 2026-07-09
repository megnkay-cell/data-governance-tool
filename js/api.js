// Set to false and fill in ALATION_BASE_URL + ALATION_TOKEN to use the real Alation API
const USE_MOCK = true;
const ALATION_BASE_URL = '';  // e.g. https://yourcompany.alation.com
const ALATION_TOKEN = '';     // Alation API token

const Api = {
  async getDataObjects() {
    if (USE_MOCK) {
      // Simulate network latency
      return new Promise(resolve => setTimeout(() => resolve(MOCK_DATA.dataObjects), 300));
    }

    const res = await fetch(`${ALATION_BASE_URL}/integration/v2/data/?limit=100`, {
      headers: { 'TOKEN': ALATION_TOKEN }
    });
    if (!res.ok) throw new Error(`Alation API error: ${res.status}`);
    return res.json();
  }
};
