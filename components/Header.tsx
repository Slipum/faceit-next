"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import PlayerAvaSearch from "./PlayerAvaSearch";

type Item = {
  player_id: string;
  nickname: string;
  avatar: string;
};

type Data = {
  items: Item[];
};

export function Header() {
  const searchWrapperRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Используем useRouter для навигации
  const [focused, setFocused] = useState(false);
  const [players, setPlayers] = useState<Data>();
  const [nickname, setNickname] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  // useClickAway(inputRef, () => {
  // 	setFocused(false);
  // });

  useClickAway(searchWrapperRef, () => {
    setFocused(false);
  });

  useDebounce(
    () => {
      setDebouncedValue(nickname);
    },
    200,
    [nickname],
  );

  useEffect(() => {
    if (debouncedValue.trim().length > 2) {
      const fetchPlayers = async () => {
        try {
          setError(null);

          const response = await fetch(
            `/api/faceit?url=search/players?nickname=${debouncedValue}&limit=10`,
            {
              method: "GET",
            },
          );

          if (!response.ok) {
            throw new Error(
              `Error: ${response.status} - ${response.statusText}`,
            );
          }
          const data = await response.json();
          setPlayers(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "error");
        }
      };
      fetchPlayers();
    }
  }, [debouncedValue]);

  // Очистка поля ввода
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setNickname("");
      setPlayers(undefined);
    }
  };

  // Обработка нажатия Enter
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter" && inputRef.current) {
      const username = inputRef.current.value.trim();
      if (username) {
        router.push(`/profile?search=${username}`);
      }
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="parent-header" ref={searchWrapperRef}>
      <header className="header-container">
        <div className="h-logo">
          <Link href="/" style={{ display: "flex" }}>
            <h1>
              <i className="fa-solid fa-chart-simple"></i> Faceit-Next
            </h1>
            <p
              style={{
                fontSize: "24px",
                padding: "10px 20px",
                fontWeight: "700",
              }}
            >
              for
            </p>
            <Image
              style={{ width: "50px", height: "auto" }}
              priority
              width={50}
              height={58.4}
              src="https://distribution.faceit-cdn.net/images/37c4c8fa-31a2-4a81-8654-cf133ec29856.svg"
              alt="CS2"
            />
          </Link>
        </div>
        <div className="search-wrapper">
          <div className="search-container">
            <div className="find-container">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              type="text"
              id="username"
              placeholder="Enter faceit username"
              autoComplete="off"
              ref={inputRef}
              onKeyDown={handleKeyDown}
              onChange={(e) => setNickname(e.target.value)}
              onFocus={() => setFocused(true)}
            />
            <button id="clearStats" onClick={handleClear}>
              <i className="fa-regular fa-circle-xmark"></i>
            </button>
          </div>
        </div>
        <div className="h-auth">
          <Link
            className="github"
            href="https://github.com/Slipum/faceit-next"
            target="_blank"
          >
            <i className="fa-brands fa-github"></i>
          </Link>
        </div>
      </header>
      {focused && debouncedValue.length > 2 && (
        <div className="search-wr">
          {players &&
            players.items.map((player) => {
              return (
                <Link
                  key={player.player_id}
                  href={`/profile?search=${player.nickname}`}
                  onClick={() =>
                    router.push(`/profile?search=${player.nickname}`)
                  }
                >
                  <div className="search-value">
                    <PlayerAvaSearch
                      avatar={player.avatar}
                      nickname={player.nickname}
                    />
                    <p>{player.nickname}</p>
                  </div>
                </Link>
              );
            })}
          {players?.items.length == 0 && (
            <div>
              <div className="search-value">
                <p>Haven`t found the right players</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
