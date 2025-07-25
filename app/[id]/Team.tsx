import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PlayerAvatar from "./PlayerAvatar";

interface Item {
  nickname: string;
  i6: string; // kills
  i8: string; // deaths
  i7: string; // assists
  c10: string; // adr
  c4: string; // headshots
  c2: string; // kd
  c3: string; // kr
}

interface Player {
  nickname: string;
  avatar: string;
  elo: number;
}

type TeamProps = {
  rounds: string[];
  team: {
    name: string;
    avatar: string;
    roster: Player[];
  };
  players: Item[];
  pos: string;
};

export default function Team({ rounds, team, players, pos }: TeamProps) {
  const [switchButton, setSwitchButton] = useState<boolean>(false);
  const [btn, setBtn] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);

  function getPlayerStats(items: Item[], ascending: boolean = true): Item[] {
    return items
      .slice()
      .sort((a, b) =>
        ascending ? Number(b.i6) - Number(a.i6) : Number(a.i6) - Number(b.i6),
      );
  }

  function sortedPlayerStats(
    items: Item[],
    roster: Player[],
    ascending: boolean = true,
  ): Player[] {
    // Создаем объект для быстрого доступа к индексам элементов в items
    const itemIndexMap: { [key: string]: number } = {};
    getPlayerStats(items).forEach((item, index) => {
      itemIndexMap[item.nickname] = index;
    });

    // Сортируем roster на основе порядка в items
    return roster.slice().sort((a, b) => {
      const indexA = itemIndexMap[a.nickname];
      const indexB = itemIndexMap[b.nickname];

      if (indexA === undefined || indexB === undefined) {
        // Если nickname не найден в items, сохраняем исходный порядок
        return 0;
      }

      return ascending ? indexA - indexB : indexB - indexA;
    });
  }

  function getLVL(lvl: number) {
    if (lvl <= 500) return "1";
    if (lvl <= 750) return "2";
    if (lvl <= 900) return "3";
    if (lvl <= 1050) return "4";
    if (lvl <= 1200) return "5";
    if (lvl <= 1350) return "6";
    if (lvl <= 1530) return "7";
    if (lvl <= 1750) return "8";
    if (lvl <= 2000) return "9";
    return "10";
  }

  return (
    <div className={`team-${pos == "right" ? "two" : "one"}`}>
      {rounds &&
        (pos == "right" ? (
          <h1
            style={{
              color: `${
                Number(rounds[1]) > Number(rounds[0]) ? "#66bb6a" : "#ff4d4f"
              }`,
              padding: "5px",
              width: "fit-content",
            }}
          >
            {rounds[1]}
          </h1>
        ) : (
          <h1
            style={{
              color: `${
                Number(rounds[0]) > Number(rounds[1]) ? "#66bb6a" : "#ff4d4f"
              }`,
              padding: "5px",
              width: "fit-content",
            }}
          >
            {rounds[0]}
          </h1>
        ))}
      <div className={`${pos == "right" ? "left l" : "right r"}-container`}>
        {pos == "right" && (
          <>
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "white",
              }}
              onClick={() => (setSwitchButton(!switchButton), setBtn(true))}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <i
                className={`fa-solid fa-arrow-${
                  switchButton && btn ? "down-wide-short" : "up-short-wide"
                }`}
              ></i>
            </button>
            {isHovered && <div className="tipTwo">It`s sorting by kills</div>}
          </>
        )}
        <Image
          src={team.avatar ? team.avatar : ""}
          alt={" "}
          width={100}
          height={100}
          style={{
            backgroundImage: "url(/Group1.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            border: "none",
          }}
        />
        <h1>{team.name}</h1>
        {pos == "left" && (
          <>
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "white",
              }}
              onClick={() => (setSwitchButton(!switchButton), setBtn(true))}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <i
                className={`fa-solid fa-arrow-${
                  switchButton && btn ? "down-wide-short" : "up-short-wide"
                }`}
              ></i>
            </button>
            {isHovered && <div className="tipOne">It`s sorting by kills</div>}
          </>
        )}
      </div>
      <div className="players">
        {btn
          ? sortedPlayerStats(players, team.roster, switchButton).map(
              (player) => (
                <div className="player" key={player.nickname}>
                  <Link href={`/profile?search=${player.nickname}`}>
                    <PlayerAvatar
                      avatar={player.avatar}
                      nickname={player.nickname}
                    />
                    <div className="pl-cont">
                      <div className="player-container">
                        <div className="left">
                          <span>{player.nickname}</span>
                        </div>
                        <div className="right">
                          <span>{player.elo}</span>
                          <Image
                            src={`https://cdn-frontend.faceit-cdn.net/web/static/media/assets_images_skill-icons_skill_level_${getLVL(
                              player.elo,
                            )}_svg.svg`}
                            alt={getLVL(player.elo)}
                            width={32}
                            height={32}
                          />
                        </div>
                      </div>
                      <div className="player-stats">
                        {players &&
                          players
                            .filter((p) => player.nickname == p.nickname)
                            .map((p) => (
                              <table key={p.nickname}>
                                <thead>
                                  <tr>
                                    <th>Kills</th>
                                    <th>K/D</th>
                                    <th>K/R</th>
                                    <th>ADR</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{p.i6}</td>
                                    <td>{p.c2}</td>
                                    <td>{p.c3}</td>
                                    <td>{p.c10}</td>
                                  </tr>
                                </tbody>
                              </table>
                            ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ),
            )
          : team.roster.map((player) => (
              <div className="player" key={player.nickname}>
                <Link href={`/profile?search=${player.nickname}`}>
                  <PlayerAvatar
                    avatar={player.avatar}
                    nickname={player.nickname}
                  />
                  <div className="pl-cont">
                    <div className="player-container">
                      <div className="left">
                        <span>{player.nickname}</span>
                      </div>
                      <div className="right">
                        <span>{player.elo}</span>
                        <Image
                          src={`https://cdn-frontend.faceit-cdn.net/web/static/media/assets_images_skill-icons_skill_level_${getLVL(
                            player.elo,
                          )}_svg.svg`}
                          alt={getLVL(player.elo)}
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                    <div className="player-stats">
                      {players &&
                        players
                          .filter((p) => player.nickname == p.nickname)
                          .map((p) => (
                            <table key={p.nickname}>
                              <thead>
                                <tr>
                                  <th>Kills</th>
                                  <th>K/D</th>
                                  <th>K/R</th>
                                  <th>ADR</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{p.i6}</td>
                                  <td>{p.c2}</td>
                                  <td>{p.c3}</td>
                                  <td>{p.c10}</td>
                                </tr>
                              </tbody>
                            </table>
                          ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}
