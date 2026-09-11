# auth.md - Nighthawk PDF Reader Agent Registration

You are an autonomous AI agent or automated assistant. This service implements the **Auth.md Agent Registration Discovery** standard: discover → register → (claim if needed) → obtain credentials → execute actions.

## 1. Service Overview & Audience

- **Target Audience**: AI agents, autonomous assistants, MCP clients, and automated research tools looking to discover, index, or interact with Nighthawk PDF Reader tools and documentation.
- **Resource Identifier**: `https://nighthawkpdfreader.app`
- **Protected Resource Metadata (PRM)**: `https://nighthawkpdfreader.app/.well-known/oauth-protected-resource`
- **Authorization Server Metadata**: `https://nighthawkpdfreader.app/.well-known/oauth-authorization-server`
- **Access Level**: Public and anonymous-friendly. All landing pages, benchmarks, download links, and LLM reference indexes (`/llms.txt`, `/index.md`) are open without mandatory human login.

## 2. Discovery Path (Two-Hop)

### Hop 1: Protected Resource Metadata
Agents inspect protected resources by querying RFC 9728 metadata at:
```http
GET /.well-known/oauth-protected-resource HTTP/1.1
Host: nighthawkpdfreader.app
Accept: application/json
```

Response includes the authorized issuer(s), supported scopes (`read`), and bearer method (`header`).

### Hop 2: Authorization Server Metadata
Agents fetch the authorization server configuration at:
```http
GET /.well-known/oauth-authorization-server HTTP/1.1
Host: nighthawkpdfreader.app
Accept: application/json
```

The response includes the `agent_auth` block advertising valid registration endpoints and supported identity flows.

## 3. Supported Registration Flows

### Flow A: Anonymous Agent Access (Default)
Enables immediate, autonomous access for agents without pre-existing user accounts or manual credentials.
- **Identity Type**: `anonymous`
- **Registration URI**: `https://nighthawkpdfreader.app/agent/auth`
- **Claim URI**: `https://nighthawkpdfreader.app/agent/claim`
- **Credential Types**: `bearer_token`, `api_key`

Example registration payload:
```json
{
  "identity_type": "anonymous",
  "client_name": "MyAssistantBot/1.0"
}
```

### Flow B: Identity Assertion (ID-JAG & Verified Email)
Enables agents acting on behalf of a verified human user to present cryptographic assertions.
- **Identity Type**: `identity_assertion`
- **Supported Assertion Types**:
  - `urn:ietf:params:oauth:token-type:id-jag`
  - `verified_email`
- **Registration URI**: `https://nighthawkpdfreader.app/agent/auth`
- **Revocation URI**: `https://nighthawkpdfreader.app/oauth/revoke`
- **Revocation Event**: `https://schemas.workos.com/events/agent/auth/identity/assertion/revoked`
- **Credential Types**: `bearer_token`, `api_key`

## 4. Credential Usage

Send acquired tokens in the HTTP `Authorization` request header:
```http
GET / HTTP/1.1
Host: nighthawkpdfreader.app
Authorization: Bearer <access_token>
```
Tokens are scoped to `read` access for public resources and documentation endpoints.
