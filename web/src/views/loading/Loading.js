import styles from './Loading.module.css'; // Import css modules stylesheet as styles

const arr = new Array(9).fill('').map((item, index) => index);

const Loader = () => (
    <section className={styles.section}>
        <div className={styles.loader}>
            {
                arr.map(i => (
                    <div key={`loader-top-${i}`} className={styles.dot} style={{'--i': i}}/>
                ))
            }
        </div>
        <h2 className={styles.text}>Loading...</h2>
        <div className={styles.loader}>
            {
                arr.map(i => (
                    <div key={`loader-bottom-${i}`} className={`${styles.dot} ${styles.reverse}`} style={{'--i': i}}/>
                ))
            }
        </div>
    </section>
)

export default Loader;
