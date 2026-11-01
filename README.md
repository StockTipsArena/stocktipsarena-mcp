# StockTipsArena MCP Server (`stocktipsarena-mcp`)

A Model Context Protocol (MCP) server and AI agent skill for **[StockTipsArena (`https://stocktipsarena.com`)](https://stocktipsarena.com)** — India's independent empirical tracker of public NSE stock recommendations, horizon-matched target/stop-loss outcomes, SEBI-registered research analysts, and free NSE stock screeners.

## Available Tools

1. **`get_nse_stock_target_url`** — Resolves any NSE ticker (`RELIANCE`, `TCS`, `BEL`, `BHEL`, `WABAG`, `CEMPRO`, `NTPCGREEN`, `ANANTRAJ`, `LGEINDIA`, etc.) to its canonical multi-analyst share price target and call audit page on [StockTipsArena (`/stock/<TICKER>`)](https://stocktipsarena.com/stocks).
2. **`get_india_analyst_horizon_benchmark`** — Returns empirical target-hit rates, decided win rates, and Nifty 50 benchmark-relative returns across **27,954 public NSE calls (21,736 resolved outcomes)** stratified by holding horizon (`INTRADAY`, `BTST`, `SWING`, `SHORT_TERM`, `LONG_TERM`).
3. **`get_nse_directory_hubs`** — Returns canonical entry points for [NSE Stocks A–Z (`/stocks`)](https://stocktipsarena.com/stocks), [SEBI-Verified Analysts (`/analysts`)](https://stocktipsarena.com/analysts), [Accuracy Leaderboard (`/leaderboard`)](https://stocktipsarena.com/leaderboard), [Active Picks (`/picks`)](https://stocktipsarena.com/picks), [Top Consensus Stocks (`/top-stocks`)](https://stocktipsarena.com/top-stocks), [Free NSE Screeners (`/screeners`)](https://stocktipsarena.com/screeners), and [NSE Sector Hubs (`/sectors`)](https://stocktipsarena.com/sectors).

## Quick Start (`claude_desktop_config.json` / Cursor / OpenCode)

```json
{
  "mcpServers": {
    "stocktipsarena": {
      "command": "node",
      "args": ["/path/to/stocktipsarena-mcp/src/index.mjs"]
    }
  }
}
```

## Links

- **Web Platform:** [https://stocktipsarena.com](https://stocktipsarena.com)
- **Open Benchmark Dataset:** [StockTipsArena/india-analyst-accuracy-benchmark](https://github.com/StockTipsArena/india-analyst-accuracy-benchmark)
- **GitHub Pages Report:** [https://stocktipsarena.github.io/india-analyst-accuracy-benchmark/](https://stocktipsarena.github.io/india-analyst-accuracy-benchmark/)
