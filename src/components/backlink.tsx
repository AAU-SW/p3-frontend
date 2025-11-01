import React from 'react';
import { useRouter } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

interface BackLinkProps {
  label?: string;
  className?: string;
}

const BackLink: React.FC<BackLinkProps> = ({
  label = 'Back',
  className = '',
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.navigate({ to: '/' });
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-sm cursor-pointer  ${className}`}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
};

export default BackLink;
