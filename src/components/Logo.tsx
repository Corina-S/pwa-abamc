import logoDesktop from '../assets/logo-desktop.png';
import logoMobile from '../assets/logo-mobile.png';

interface LogoProps {
  variant?: 'desktop' | 'mobile';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ variant = 'desktop', size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  const logo = variant === 'mobile' ? logoMobile : logoDesktop;

  return (
    <img
      src={logo}
      alt="ABAMC - Accademia di Belle Arti di Macerata"
      className={`${sizeClasses[size]} w-auto object-contain ${className}`}
    />
  );
}
