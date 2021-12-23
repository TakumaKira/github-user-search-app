import getIconUrl from '../../services/getIconUrl';

function Icon({className, iconId}: {className?: string, iconId: string}) {
  return (
    <svg
      role='icon'
      className={className || ''}
    >
      <use xlinkHref={getIconUrl(iconId)}></use>
    </svg>
  )
}

export default Icon;