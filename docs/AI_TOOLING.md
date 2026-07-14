# Se'kret Bip demo — MCP tooling boundary

This repository is a demonstration surface, not the production Se'kret Bip trust boundary. Tooling may support code and documentation work, but it must not introduce or process real teen, parent, journal, voice, safety, account, or relationship data.

## MCP servers

- **GitHub:** repository, pull-request, Actions, and security evidence with allow-listed toolsets and lockdown mode.
- **Bright Data:** VS Code/Codespaces only, prompted at runtime for `API_TOKEN`, and restricted to `GROUPS=code` for current npm and PyPI package metadata.
- **Microsoft Learn:** current official Microsoft technical documentation and code samples; no authentication required.

The committed root `.mcp.json` remains credential-free. MCP hosts other than VS Code/Codespaces must configure Bright Data locally and keep the API token outside the repository.

Bright Data Pro Mode, browser automation, ecommerce tools, broad scraping, and general web-data groups are intentionally disabled. Use invented demo fixtures only. Do not send real Bip user content, identity, private product plans, credentials, or production evidence to external MCP tools.
