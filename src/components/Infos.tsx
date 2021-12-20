import { iconIds } from '../config.json';
import formatUsername from '../services/formatUsername';
import getUserpage, { AccountType } from '../services/getUserpage';
import Info from './Info';
import styles from './Infos.module.sass';

function Infos({location, blogUrl, twitterUsername, company, hasColumns, className}: {location: string | null, blogUrl: string | null, twitterUsername: string | null, company: string | null, hasColumns: boolean, className?: string}) {
  return hasColumns
    ? (
      <div className={`${styles.columnsContainer} ${className}`}>
        <div
          className={styles.rowsContainer}
          style={{width: '50%'}}
        >
          <Info
            iconId={iconIds.Location}
            info={location}
          />
          <Info
            iconId={iconIds.Website}
            info={blogUrl}
            linkUrl={blogUrl}
          />
        </div>
        <div
          className={styles.rowsContainer}
        >
          <Info
            iconId={iconIds.Twitter}
            info={twitterUsername ? formatUsername(twitterUsername) : null}
            linkUrl={twitterUsername ? getUserpage(twitterUsername, AccountType.Twitter) : null}
          />
          <Info
            iconId={iconIds.Company}
            info={company}
          />
        </div>
      </div>
    )
    : (
      <div
        className={`${styles.rowsContainer} ${className}`}
      >
        <Info
          iconId={iconIds.Location}
          info={location}
        />
        <Info
          iconId={iconIds.Website}
          info={blogUrl}
          linkUrl={blogUrl}
        />
        <Info
          iconId={iconIds.Twitter}
          info={twitterUsername ? formatUsername(twitterUsername) : null}
          linkUrl={twitterUsername ? getUserpage(twitterUsername, AccountType.Twitter) : null}
        />
        <Info
          iconId={iconIds.Company}
          info={company}
        />
      </div>
    )
  ;
}

export default Infos;