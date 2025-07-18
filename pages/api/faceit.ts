import type { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = process.env.FACEIT_BASE_URL;
if (!BASE_URL) {
  throw new Error("Environment variable FACEIT_BASE_URL is not defined");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Извлекаем параметр "url" и все остальные параметры
  const { url: inputUrl, ...rest } = req.query;

  if (!inputUrl || typeof inputUrl !== "string") {
    return res
      .status(400)
      .json({ error: 'The "url" parameter is required and must be a string.' });
  }

  // Если inputUrl начинается с "http", считаем его абсолютным,
  let targetUrl = inputUrl.startsWith("http")
    ? inputUrl
    : BASE_URL + (inputUrl.startsWith("/") ? inputUrl.substring(1) : inputUrl);

  // Для передачи дополнительных параметров, добавляем их к targetUrl
  const additionalParams = new URLSearchParams();
  for (const [key, value] of Object.entries(rest)) {
    if (typeof value === "string") {
      additionalParams.append(key, value);
    }
  }
  const additionalQuery = additionalParams.toString();
  if (additionalQuery) {
    targetUrl += (targetUrl.includes("?") ? "&" : "?") + additionalQuery;
  }

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`, // Server API key remains secure on the server side
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Error when requesting Faceit API: ${response.statusText}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: unknown) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown server error",
    });
  }
}
