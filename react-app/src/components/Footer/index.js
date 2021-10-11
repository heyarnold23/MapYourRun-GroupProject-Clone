import {VscGithubAlt} from 'react-icons/vsc'
import {AiFillLinkedin} from 'react-icons/ai'

import styles from './Footer.module.css'


export default function Footer (){

    return(
        <div className={styles.main}>
            <div className={styles.column}>
                <div className={styles.name}>
                    STEVEN BARNETT
                </div>
                <div className={styles.icons}>
                    <a className={styles.icon}href="https://github.com/StevenBarnett1">
                        <VscGithubAlt />
                    </a>
                    <a className={styles.icon} style={{marginLeft: '10px'}} href="https://www.linkedin.com/in/steven-r-barnett/">
                        <AiFillLinkedin />
                    </a>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.name}>
                    CHRISTOPHER FELIX
                </div>
                <div className={styles.icons}>
                    <a className={styles.icon}href="https://github.com/thesavoyard77">
                        <VscGithubAlt />
                    </a>
                    <a className={styles.icon} style={{marginLeft: '10px'}} href="https://www.linkedin.com/in/christopher-felix-a7a25a51/">
                        <AiFillLinkedin />
                    </a>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.name}>
                    ARNOLD CABANG
                </div>
                <div className={styles.icons}>
                    <a className={styles.icon}href="https://github.com/heyarnold23">
                        <VscGithubAlt />
                    </a>
                    <a className={styles.icon} style={{marginLeft: '10px'}} href="https://www.linkedin.com/in/arnold-cabang-615932216/">
                        <AiFillLinkedin />
                    </a>
                </div>
            </div>


        </div>
    )

}
