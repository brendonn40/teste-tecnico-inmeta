import { getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { useEffect, useState } from 'react';

function CustomAvatar({
  username,
  image,
}: {
  username: string;
  image?: string;
}) {
  const colors = [
    'text-cyan-500',
    'text-yellow-500',
    'text-violet-500',
    'text-purple-500',
    'text-orange-500',
    'text-emerald-500',
    'text-blue-500',
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(getRandomColor());
  }, []);
  return (
    <Avatar className="h-10 w-10 border border-input">
      <AvatarImage src={image} alt={username} />
      <AvatarFallback className={`bg-white ${color} font-bold`} delayMs={600}>
        {username ? getInitials(username) : 'U'}
      </AvatarFallback>
    </Avatar>
  );
}

export default CustomAvatar;
