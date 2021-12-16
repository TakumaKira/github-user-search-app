import Info from './Info';
import { iconIds } from '../config.json';
import styles from './Infos.module.sass';

function Infos({location, blogUrl, twitterUsername, company, hasColumns}: {location: string | null, blogUrl: string | null, twitterUsername: string | null, company: string | null, hasColumns: boolean}) {
  return hasColumns
    ? (
      <div className={styles.columnsContainer}>
        <div>
          <Info
            iconId={iconIds.Location}
            info={location}
          />
          <Info
            iconId={iconIds.Website}
            info={blogUrl}
          />
        </div>
        <div>
          <Info
            iconId={iconIds.Twitter}
            info={twitterUsername}
          />
          <Info
            iconId={iconIds.Company}
            info={company}
          />
        </div>
      </div>
    )
    : (
      <div>
        <Info
          iconId={iconIds.Location}
          info={location}
        />
        <Info
          iconId={iconIds.Website}
          info={blogUrl}
        />
        <Info
          iconId={iconIds.Twitter}
          info={twitterUsername}
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