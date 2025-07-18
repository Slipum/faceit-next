export const headers = {
  accept: "application/json, text/plain, */*",
  "accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
  "faceit-referer": "new-frontend",
  priority: "u=1, i",
  referer: "https://www.faceit.com/ru/players/s1mle/stats/cs2",
  "sec-ch-ua":
    '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
};

// ----
type MapIcons = {
  [key: string]: string;
};

const mapIcons: MapIcons = {
  de_mirage:
    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
  de_vertigo:
    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3bf25224-baee-44c2-bcd4-f1f72d0bbc76_1695819180008.jpeg",
  de_overpass:
    "https://distribution.faceit-cdn.net/images/8ba6f730-fa31-4dd7-9b41-4cff81d79fef.jpeg",
  de_ancient:
    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
  de_dust2:
    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
  de_anubis:
    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
  de_nuke:
    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
  de_inferno:
    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
  de_train:
    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
};

export function getIconMap(map: string): string {
  const iconUrl = mapIcons[map] || "";
  if (!iconUrl) {
    return "";
  } else {
    return iconUrl;
  }
}
// ----

const maps: MapIcons = {
  de_mirage:
    "https://tiermaker.com/images/media/template_images/2024/17380318/counter-strike-2--cs2---csgo--maps-17380318/mirage.png",
  de_vertigo:
    "https://tiermaker.com/images/template_images/2022/15381016/counter-strike-map-icons-15381016/ezgif-5-60355f0c79.png",
  de_ancient:
    "https://tiermaker.com/images/media/template_images/2024/17380318/counter-strike-2--cs2---csgo--maps-17380318/ancient.png",
  de_dust2:
    "https://tiermaker.com/images/media/template_images/2024/17380318/counter-strike-2--cs2---csgo--maps-17380318/dust-2.png",
  de_anubis:
    "https://tiermaker.com/images/template_images/2022/15381016/counter-strike-map-icons-15381016/ezgif-5-5287fdc954.png",
  de_nuke:
    "https://tiermaker.com/images/media/template_images/2024/17380318/counter-strike-2--cs2---csgo--maps-17380318/nuke.png",
  de_inferno:
    "https://tiermaker.com/images/media/template_images/2024/17380318/counter-strike-2--cs2---csgo--maps-17380318/inferno.png",
  de_train:
    "https://tiermaker.com/images/media/template_images/2024/17380318/counter-strike-2--cs2---csgo--maps-17380318/train.png",
  de_overpass:
    "https://tiermaker.com/images/media/template_images/2024/17380318/counter-strike-2--cs2---csgo--maps-17380318/overpass.png",
};
export function getLogoMap(map: string): string {
  return maps[map];
}
