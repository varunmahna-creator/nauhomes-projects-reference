# Iraaj VM — Operational Context

**Owner:** Varun Mahna (varunmahna@gmail.com)
**Operator:** Sumit + Dhurandhar (Sumit's AI on Opus 4.7)
**Last updated:** 2026-04-25 by Dhurandhar
**Purpose:** Single source of truth for Iraaj VM state — model, version, configs, auto-updates, gotchas. Read this first before any ops work.

---

## VM Basics

| Field | Value |
|---|---|
| Hostname | `iraaj` (SSH alias from Sumit's machine) |
| IP | 34.80.141.244 |
| User | `varunmahna` |
| OS | Ubuntu (Linux 6.x) |
| Workspace | `/opt/ocplatform/workspace/` |
| OpenClaw install | `/usr/lib/node_modules/openclaw/` (npm global) |
| Config dir | `/opt/openclaw/.openclaw/` |
| Logs | `/tmp/openclaw/ocplatform-YYYY-MM-DD.log` |

## Current State (2026-04-25)

| Component | State |
|---|---|
| OpenClaw version | **2026.4.23** (latest) |
| Default model | **`anthropic/claude-opus-4-7`** (no fallbacks) |
| Discord bot | `@Iraaj` (`1476501158515314688`) — logged in |
| WhatsApp provider | `+919930331031` — connected |
| Routing layer | port 18802 (anthropic obfuscation) |
| Routing layer #2 | port 18801 (account 2) |
| Gateway | port 18789 (websocket) |
| Auto-updater cron | **enabled**, runs daily 04:00 UTC (09:30 IST) |

## Model Policy (HARD RULE — set 2026-04-25)

> **ALWAYS Opus 4.7. Everywhere. No exceptions.**

Subscription covers all model usage; there is **no per-token cost concern**. Pick model by capability, not cost.

- This applies to **Iraaj's setup AND Sumit's setup AND any new agent we spin up.**
- Other models (Sonnet, Haiku, GPT-5.4, Synthetic) are available in `models.json` for **manual `/model` switching only**. Never set as default.
- If someone proposes "downgrading to Sonnet to save tokens" — refuse. There's nothing to save.

**Config location:** `/opt/openclaw/.openclaw/openclaw.json` →
```json
"agents": {
  "defaults": {
    "model": {
      "primary": "anthropic/claude-opus-4-7",
      "fallbacks": []
    }
  }
}
```

## Auto-Update System (set up 2026-04-25)

**Why:** OpenClaw releases every 2-3 days. Iraaj was 16 days / 9 stable releases behind on 2026-04-25 because no one updated him manually. Auto-update prevents drift.

**Components:**

| File | Owner | Purpose |
|---|---|---|
| `/usr/local/bin/ocplatform-auto-update.sh` | root | The updater script — checks npm, installs if newer, restarts gateway, notifies Discord |
| `/etc/cron.d/openclaw-update` | root | Cron entry: `0 4 * * * root /usr/local/bin/openclaw-auto-update.sh` |
| `/var/log/openclaw-updater/update.log` | root | Append-only log of all check runs |

**Behavior:**
1. Compares `openclaw --version` vs `npm view openclaw version`
2. If different: `npm install -g openclaw@latest` → `systemctl restart ocplatform.service`
3. After 5s, checks gateway is `is-active`. If clean, posts to Discord channel `1487472713030172933` (#dhurandhar-iraaj):
   `🔄 OpenClaw auto-updated on Iraaj VM: <old> → <new>. Gateway restarted clean.`
4. If gateway fails to start: posts an ⚠️ failure alert and exits non-zero.

**Manual trigger:** `sudo /usr/local/bin/openclaw-auto-update.sh` (idempotent — does nothing if up to date)

**Notification user:** Sends as `varunmahna` (the OpenClaw user on this VM), so the message routes through @Iraaj's Discord bot.

## Schema Migrations (Discovered 2026-04-25)

When upgrading across major version bumps, schema changes can break things silently. **Always check journalctl for ERROR after auto-update.**

### Known: 2026.4.23 — Discord multi-account schema

**Old schema (≤ 2026.4.22):**
```json
"channels": {
  "discord": {
    "token": "<bot_token>"
  }
}
```

**New schema (≥ 2026.4.23):**
```json
"channels": {
  "discord": {
    "token": "<bot_token>",            // KEEP for backward compat
    "accounts": {
      "default": {
        "token": "<bot_token>"          // ADD this
      }
    }
  }
}
```

If you see `Error: Discord bot token missing for account "default"`, copy `channels.discord.token` to `channels.discord.accounts.default.token` and restart.

### Plugin system (introduced 2026.4.23)

First restart after upgrade triggers bundled-plugin npm installs:
- `acpx`
- `amazon-bedrock` + `amazon-bedrock-mantle`
- `browser` (with playwright-core, ~200MB)
- `microsoft` (TTS via node-edge-tts)

Takes **~3 minutes** on first run. Don't panic if gateway doesn't show `[gateway] listening` for that long.

## Process & Port Reference

| Process name | Port | Purpose |
|---|---|---|
| `openclaw-gateway` (truncated to `openclaw-` in `lsof`) | 18789 | Main agent gateway (websocket) |
| `node …routing-layer.js` | 18801 | Routing layer (account 2) |
| `node …billing-proxy.js` | 18802 | Routing layer (primary, anthropic obfuscation) |
| `nginx` | 80, 443 | Reverse proxy (varun's nauhomes etc.) |

**Common pitfall:** `lsof | grep " node "` will MISS the gateway because its process name is `openclaw-gateway`. Use `lsof -i :18789` or `lsof | grep openclaw`.

## Flaky FS Quirk (`/opt/openclaw/.openclaw/`)

The `/opt/ocplatform/.openclaw/` directory has **intermittent ENOENT for direct path access** over SSH. Symptoms:
- `ls /opt/openclaw/.openclaw/openclaw.json` → "No such file"
- `cat /opt/openclaw/.openclaw/openclaw.json` → "No such file"
- BUT: `ls -la /opt/openclaw/.openclaw/` (no specific file) → succeeds and shows the file

**Workarounds (in order of preference):**

1. **Always use `find -exec`** for direct file ops:
   ```bash
   sudo find /opt/openclaw/.openclaw -maxdepth 1 -name "openclaw.json" -exec cat {} \;
   ```

2. **Warm the inode cache** with a directory listing first:
   ```bash
   sudo ls /opt/openclaw/.openclaw/ >/dev/null
   sudo cat /opt/openclaw/.openclaw/openclaw.json   # NOW works
   ```

3. **Refresh SSH connection** (kills stale ControlMaster sockets):
   ```bash
   ssh -O exit iraaj
   rm -f ~/.ssh/sockets/*iraaj*
   sleep 3
   ```

4. **NEVER use Python `open()` directly** on these paths — fails reliably with ENOENT. Use `cat | python3 -c "import sys, json; d = json.load(sys.stdin); …"` instead.

**Sudo NOT required for varunmahna's files** — user `varunmahna` owns the workspace despite the path looking system-y.

## SSH Access Pattern

```bash
# From Sumit's machine
ssh iraaj            # works via ~/.ssh/config alias

# Always prefer for ops scripts (avoids ControlMaster mux deadlocks):
ssh -o ControlMaster=no -o ControlPath=none -o ConnectTimeout=20 iraaj '<command>'
```

If many SSH sessions hang in parallel, kill them:
```bash
pkill -f "ssh.*iraaj"
rm -f ~/.ssh/sockets/*
sleep 3
```

## Repos on this VM

| Path | Repo | Purpose |
|---|---|---|
| `/opt/openclaw/workspace/nauhomes` | github.com/varunmahna-creator/nauhomes | Real estate site (Vercel) |
| `/opt/openclaw/workspace/varun-astro` | github.com/varunmahna-creator/varun-astro | Astro engine (private) |
| `~/.config/gh/hosts.yml` | (config) | GitHub OAuth token for `gh` CLI |

**Git author for commits:** `varunmahna@gmail.com / Varun Mahna` (always pass `-c user.email=… -c user.name=…` if running as Dhurandhar to avoid leaking my identity into commits).

## Backup Locations

**On Sumit's VM (`/home/sumit/clawd/backups/`):**
- `iraaj-openclaw-config-2026-04-25.json` — pre-Opus-switch original (3558 bytes, model was sonnet)

**On Iraaj VM (`/tmp/`):**
- `/tmp/openclaw.json.opus-switch-bak-2026-04-25` — post-Opus-switch, pre-schema-migration (3592 bytes)

**Recovery procedure** if config breaks:
```bash
# From Sumit's machine
scp /home/sumit/clawd/backups/iraaj-openclaw-config-2026-04-25.json iraaj:/tmp/restore.json
ssh iraaj 'sudo cat /tmp/restore.json > /opt/openclaw/.openclaw/openclaw.json && sudo systemctl restart openclaw.service'
```

## Useful Commands

```bash
# Version + status
openclaw --version
sudo systemctl status openclaw.service
sudo journalctl -u openclaw.service -n 30 --no-pager

# Confirm model
sudo journalctl -u openclaw.service --no-pager | grep "agent model"

# Confirm gateway listening
sudo lsof -i :18789 -P -n

# Check auto-update log
sudo cat /var/log/openclaw-updater/update.log

# Manual auto-update trigger (idempotent)
sudo /usr/local/bin/openclaw-auto-update.sh

# Routing layer status
sudo systemctl status billing-proxy.service
sudo systemctl status billing-proxy-account2.service
sudo systemctl status openclaw-routing-layer.service

# View structured logs nicely
sudo tail -20 /tmp/openclaw/ocplatform-$(date +%Y-%m-%d).log | python3 -c "
import json, sys
for line in sys.stdin:
    line = line.strip()
    if not line.startswith('{'): continue
    try:
        e = json.loads(line)
        msg = e.get('1', e.get('0', ''))[:200]
        t = e.get('_meta', {}).get('date', '')[:19]
        lvl = e.get('_meta', {}).get('logLevelName', '')
        print(f'{t} {lvl} {msg}')
    except: pass
"
```

## History

- **2026-02-22** — OpenClaw first installed on this VM (version 2026.2.22)
- **2026-04-19** — Astro engine project deleted, fresh start in #dhurandhar-iraaj
- **2026-04-20** — varun-astro repo created and pushed to GitHub
- **2026-04-23** — nauhomes broken admin panel fixed by Dhurandhar (5 commits, real Postgres + Blob)
- **2026-04-24** — Nauhomes timeline + virtual tour video upload shipped (3 commits, client-side direct-to-Blob)
- **2026-04-25 09:38 UTC** — Default model switched **Sonnet → Opus 4.7** per Sumit's hard rule
- **2026-04-25 09:46 UTC** — OpenClaw updated `2026.4.9 → 2026.4.23` (npm global install + restart)
- **2026-04-25 09:50 UTC** — Discord schema migrated (`channels.discord.accounts.default.token`)
- **2026-04-25 09:54 UTC** — Auto-updater installed (`/etc/cron.d/openclaw-update`, daily 04:00 UTC)

## Three Rules for Iraaj (set 2026-04-25, paste into PROJECT_CONTEXT.md)

1. **Read platform docs BEFORE writing code.** Vercel limits, Postgres quirks, openclaw schema — find the official answer first. If your idea contradicts the docs, the docs are right.

2. **Verify end-to-end on the live URL before saying "done".** Not "build passed". Not "API returned 200". Open the production site, do the actual user action, see the actual result.

3. **When stuck for 3+ commits, STOP and rethink architecture.** Patching the same bug repeatedly = wrong mental model. Re-read docs, compare your design to the recommended pattern. Renaming endpoints doesn't fix architectural mistakes.

**Bonus (escalation):** When pinging Dhurandhar, escalate **with a hypothesis**, not just symptoms. "Returns 413 on >4MB, I think function body cap is the issue, docs mention `@vercel/blob/client`, can you confirm?" — gets a 30-second answer instead of a 30-minute back-and-forth.

---

## Contact

- **Sumit** (Discord `1347405340492300401`): Iraaj's primary operator, owns this context, can SSH directly.
- **Varun** (Discord `896631452937113630`): The human Iraaj works for. He triggers most of Iraaj's work.
- **Dhurandhar** (the AI you're reading): Sumit's main agent, runs on Opus 4.7, escalation target when Iraaj is stuck.

**Channel for ops:** `#dhurandhar-iraaj` (Discord ID `1487472713030172933`, Guild `1475311609349148692`).
