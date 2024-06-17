export function checkClientApiKey(clientApiKey: string) {
  let ErrorCheckClientApiKeyResponse: {} | null = null;
  let doesClientKeyMatch = false;

  if (!process.env.NEXT_PUBLIC_API_KEY) {
    ErrorCheckClientApiKeyResponse = {
      error: "API key not set",

      status: 500,
    };
    return { doesClientKeyMatch, ErrorCheckClientApiKeyResponse };
  }

  if (clientApiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    ErrorCheckClientApiKeyResponse = {
      error: "Invalid API key",

      status: 401,
    };
  } else {
    doesClientKeyMatch = true;
  }

  return { doesClientKeyMatch, ErrorCheckClientApiKeyResponse };
}
