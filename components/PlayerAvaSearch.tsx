import Image from "next/image";
import { useState } from "react";

type PlayerProps = {
  avatar: string;
  nickname: string;
};

const PlayerAvaSearch = ({ avatar, nickname }: PlayerProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {avatar && !imageError ? (
        <Image
          src={avatar}
          alt={nickname}
          width={36}
          height={36}
          onError={() => setImageError(true)}
        />
      ) : (
        <Image src="/Group1.png" alt="avatar" width={36} height={36} />
      )}
    </>
  );
};

export default PlayerAvaSearch;
