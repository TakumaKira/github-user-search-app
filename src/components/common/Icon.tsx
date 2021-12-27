import getIconUrl from '../../services/getIconUrl';

function Icon({className, iconId}: {className?: string, iconId: string}) {
  return (
    <svg
      role='img'
      className={className || ''}
      aria-label={iconId}
    >
      <use xlinkHref={getIconUrl(iconId)}></use>
    </svg>
  )
}

export default Icon;