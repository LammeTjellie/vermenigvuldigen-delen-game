import React from 'react';

export type AvatarState = 'idle' | 'happy' | 'sad';

interface AvatarProps {
  state: AvatarState;
}

const avatarImages: Record<AvatarState, string> = {
  idle: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2R4dGJkNXQ0NnE5Zzh0ZWZicXZxZ3VweWcyMXFtbHhqdXN0dG1qayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c4zE2822gA3e4G2o6B/giphy.gif',
  happy: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG1mOWZmaDNwZm4wYnh2ZTNwNTBocjgzc2FzZGdndHo5bnBvanQ5byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/U2ga2qS42x2Y8/giphy.gif',
  sad: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzRzcnJ2MzdjbXpma2Z5M3YzaTRtNjYwbDhncHZ3cWgyODNra2o3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/tJqA6gzaC2q2Y/giphy.gif',
};

const Avatar: React.FC<AvatarProps> = ({ state }) => {
  return (
    <div className="w-48 h-48 hidden md:block animate-[float_6s_ease-in-out_infinite]">
        <img 
            src={avatarImages[state]} 
            alt="Robot Avatar" 
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}
        />
        <style>
            {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
            `}
        </style>
    </div>
  );
};

export default Avatar;
