"use client";

import { headers } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type MainProps = {
  username: string;
  setGames?: React.Dispatch<React.SetStateAction<GameData | undefined>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  comp?: number;
};

type GameData = {
  cs2: {
    faceit_elo: number;
    skill_level: number;
    region: string;
    game_player_name: string;
  };
  csgo: {
    faceit_elo: number;
    skill_level: number;
    region: string;
    game_player_name: string;
  };
};

type UserData = {
  cover_image: string;
  country: string;
  avatar: string;
  player_id: string;
  games: {
    cs2: {
      faceit_elo: number;
      skill_level: number;
      region: string;
      game_player_name: string;
    };
    csgo: {
      faceit_elo: number;
      skill_level: number;
      region: string;
      game_player_name: string;
    };
  };
  steam_id_64: string;
};

export function Main({ username, setGames, setUserId, comp = 0 }: MainProps) {
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) return;

        const response = await fetch(
          `/api/faceit?url=players?nickname=${username}`,
          {
            method: "GET",
            headers: headers,
          },
        );

        if (!response.ok) {
          throw new Error(
            `Network error: ${response.status} - ${response.statusText}`,
          );
        }
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };

    fetchData();
  }, [username]);

  if (error) {
    console.error(error);
  }
  // ---

  useEffect(() => {
    if (data && setGames) {
      setGames(data.games);
    }
  }, [data, setGames]);

  useEffect(() => {
    if (data) {
      setUserId(data.player_id);
    }
  }, [data, setUserId]);

  if (data && username) {
    return (
      <>
        <div className="main-container">
          <div
            id="main-c"
            className="main-info"
            style={{ width: `${comp == 0 ? "80%" : "100%"}` }}
          >
            <div
              id="user-back"
              className="user-container"
              style={{
                backgroundImage: `url("${data.cover_image}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <div className="overlay"></div>
              <div id="userInfo" className="user-info">
                {data.avatar ? (
                  <Image
                    id="avatar"
                    src={data.avatar}
                    alt="avatar"
                    width={300}
                    height={300}
                  />
                ) : (
                  <Image
                    id="avatar"
                    src="/Group2.png"
                    alt="avatar"
                    width={300}
                    height={300}
                  />
                )}
                <div className="avg-container">
                  <div id="average-kills">
                    <h1 className="username">
                      {username}
                      {data.steam_id_64 && (
                        <Link
                          style={{ marginLeft: "10px" }}
                          href={`https://steamcommunity.com/profiles/${data.steam_id_64}`}
                        >
                          <i className="fa-brands fa-steam"></i>
                        </Link>
                      )}
                    </h1>
                    <div className="elo-container">
                      <h2>Current ELO: {data.games.cs2.faceit_elo}</h2>
                      <div className="current-elo">
                        <Image
                          className="iconLevel"
                          src={`https://cdn-frontend.faceit-cdn.net/web/static/media/assets_images_skill-icons_skill_level_${data.games.cs2.skill_level}_svg.svg`}
                          alt="ico-level"
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {comp == 0 && (
                <Link
                  href={`/comp?player=${username}&with=`}
                  style={{ position: "absolute", top: "1rem", right: "1rem" }}
                >
                  <i className="fa-solid fa-code-compare fa-2xl"></i>
                </Link>
              )}
            </div>
            <hr />
            <div id="country-list">
              <div className="country-info">
                <i id="country-icon" className={`fi fi-${data.country}`}></i>
                <p id="country">{data.country.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
    setUserId("");
  }
}
