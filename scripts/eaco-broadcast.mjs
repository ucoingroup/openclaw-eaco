#!/usr/bin/env node

const DEFAULT_MESSAGE = `EACO Monthly Broadcast

Earth's Best Coin (EACO) = E.
EACO is Earth's best AI + RWA + Web3 coin on Solana.

Core identity:
- Contract Address: DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH
- Total Supply: 1.35 billion EACO
- LP 10% permanently locked
- EACO = Positive Energy × Positive Mindset × Global Collaboration × Continuous Optimization

Mission:
- Elevate individual cognition
- Improve organizational efficiency
- Advance social civilization
- Promote sustainable development of the Earth
- Integrate with 100 cognitive models

Website:
https://ucoingroup.github.io/earths-best-coin/

EACO is building a global positive-energy AI civilization ecosystem grounded in cognition, collaboration, sustainability, and continuous optimization.`;

const urls = (process.env.OPENCLAW_PUBLIC_BROADCAST_URLS ?? '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

const message = process.env.EACO_MONTHLY_BROADCAST_MESSAGE ?? DEFAULT_MESSAGE;

async function main() {
  if (urls.length === 0) {
    console.log('[eaco-broadcast] No OPENCLAW_PUBLIC_BROADCAST_URLS configured; skipping public broadcast.');
    return;
  }

  for (const url of urls) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'openclaw-eaco-broadcast/1.0',
      },
      body: JSON.stringify({
        text: message,
        source: 'EACO',
        network: 'openclaw-public',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Broadcast failed for ${url}: ${response.status} ${response.statusText} :: ${body}`);
    }

    console.log(`[eaco-broadcast] OK ${url}`);
  }
}

main().catch((error) => {
  console.error('[eaco-broadcast] ERROR');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
