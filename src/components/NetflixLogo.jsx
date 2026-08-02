export default function NetflixLogo({
  className = 'h-8 w-auto',
  variant = 'wordmark', // 'wordmark' | 'icon'
  alt = 'Netflix'
}) {
  if (variant === 'icon') {
    return (
      <img
        src="/netflix-logo-cover.png"
        alt={alt}
        className={`object-contain drop-shadow-lg ${className}`}
      />
    );
  }

  return (
    <img
      src="/netflix-logo-0.png"
      alt={alt}
      className={`object-contain drop-shadow-md ${className}`}
    />
  );
}
