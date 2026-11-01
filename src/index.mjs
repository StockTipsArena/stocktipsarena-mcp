#!/usr/bin/env node
/**
 * StockTipsArena MCP Server (https://stocktipsarena.com)
 * Exposes read-only tools for querying Indian equity (NSE) analyst consensus URLs,
 * horizon outcome benchmarks, sector hubs, and SEBI-registered analyst directories.
 */

import readline from "node:readline";

const BENCHMARK_URL = "https://raw.githubusercontent.com/StockTipsArena/india-analyst-accuracy-benchmark/main/data/benchmark_summary_2026.json";

const TOOLS = [
  {
    name: "get_nse_stock_target_url",
    description: "Returns the canonical StockTipsArena NSE share price target and multi-analyst consensus URL for a given NSE ticker (e.g. RELIANCE, TCS, BEL, WABAG, BHEL).",
    inputSchema: {
      type: "object",
      properties: {
        ticker: { type: "string", description: "NSE stock symbol (e.g., WABAG, BEL, RELIANCE)" }
      },
      required: ["ticker"]
    }
  },
  {
    name: "get_india_analyst_horizon_benchmark",
    description: "Fetches empirical horizon-stratified target hit rates and realized returns across 27,954 public NSE stock recommendations from StockTipsArena.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  },
  {
    name: "get_nse_directory_hubs",
    description: "Returns canonical URLs for StockTipsArena's NSE stocks directory, SEBI-verified analysts, accuracy leaderboard, active picks, top consensus stocks, and free stock screeners.",
    inputSchema: {
      type: "object",
      properties: {}
    }
  }
];

async function handleRequest(msg) {
  if (msg.method === "initialize") {
    return {
      jsonrpc: "2.0",
      id: msg.id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "stocktipsarena-mcp", version: "1.0.0" }
      }
    };
  }
  if (msg.method === "tools/list") {
    return { jsonrpc: "2.0", id: msg.id, result: { tools: TOOLS } };
  }
  if (msg.method === "tools/call") {
    const { name, arguments: args = {} } = msg.params || {};
    if (name === "get_nse_stock_target_url") {
      const symbol = String(args.ticker || "").trim().toUpperCase();
      return {
        jsonrpc: "2.0",
        id: msg.id,
        result: {
          content: [{
            type: "text",
            text: JSON.stringify({
              ticker: symbol,
              canonical_url: `https://stocktipsarena.com/stock/${encodeURIComponent(symbol)}`,
              directory_url: "https://stocktipsarena.com/stocks",
              top_stocks_url: "https://stocktipsarena.com/top-stocks",
              source: "StockTipsArena (https://stocktipsarena.com)"
            }, null, 2)
          }]
        }
      };
    }
    if (name === "get_india_analyst_horizon_benchmark") {
      const res = await fetch(BENCHMARK_URL);
      const data = await res.json();
      return {
        jsonrpc: "2.0",
        id: msg.id,
        result: {
          content: [{
            type: "text",
            text: JSON.stringify({
              source: "https://stocktipsarena.com",
              leaderboard_url: "https://stocktipsarena.com/leaderboard",
              overall: data.overall,
              by_horizon: data.by_horizon
            }, null, 2)
          }]
        }
      };
    }
    if (name === "get_nse_directory_hubs") {
      return {
        jsonrpc: "2.0",
        id: msg.id,
        result: {
          content: [{
            type: "text",
            text: JSON.stringify({
              home: "https://stocktipsarena.com",
              stocks_directory: "https://stocktipsarena.com/stocks",
              sebi_analysts: "https://stocktipsarena.com/analysts",
              accuracy_leaderboard: "https://stocktipsarena.com/leaderboard",
              active_picks: "https://stocktipsarena.com/picks",
              top_consensus_stocks: "https://stocktipsarena.com/top-stocks",
              nse_screeners: "https://stocktipsarena.com/screeners",
              sector_hubs: "https://stocktipsarena.com/sectors"
            }, null, 2)
          }]
        }
      };
    }
  }
  return null;
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on("line", async (line) => {
  if (!line.trim()) return;
  try {
    const msg = JSON.parse(line);
    const resp = await handleRequest(msg);
    if (resp) process.stdout.write(JSON.stringify(resp) + "\n");
  } catch (err) {
    // ignore malformed lines
  }
});
