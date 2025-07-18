import Image from "next/image";
import { useState } from "react";

type PlayerProps = {
  avatar: string;
  nickname: string;
};

const PlayerAvatar = ({ avatar, nickname }: PlayerProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {avatar && !imageError ? (
        <Image
          src={avatar}
          alt={nickname}
          width={78}
          height={78}
          onError={() => setImageError(true)}
        />
      ) : (
        <div id="avatar">
          <Image src="/Group1.png" alt="avatar" width={78} height={78} />
        </div>
      )}
    </>
  );
};

export default PlayerAvatar;
