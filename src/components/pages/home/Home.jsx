import styles from './styles.module.css'
import Button from '../../common/button/Button'
const Home = () => {
  
  return (
    <>
    <section className={`${styles.container} py-0`}>
        <div className={styles.context}>
        <h1 className='text-center my-3'>Craft Engaging Online Courses with Us!!</h1>
        <p className={styles.paragraph}>Crafting engaging online courses has never been easier. <br/>Our platform provides intuitive tools and support for creating dynamic learning experiences. </p>
        <div className='my-3'>
          <Button text="Start" type="bgw" w="w200"/>
        </div>
      </div>
      <div className={styles.w40}>
          <img className={styles.w100} src="glow.svg" alt="" />
      </div>

    </section>
      <section className={styles.container}>
      <div className={styles.w40}>
        <img className={styles.w100} src="future.svg" alt="" />
    </div>
      <div className={styles.context}>
      <h1 className='text-center my-3'>Join Our Online Learning Platform Today!</h1>
      <p className={styles.paragraph}>Discover the convenience and flexibility of online learning with us.<br/> Our platform offers a diverse range of courses tailored to your needs.</p>
      <div className='my-3'>
        <Button text="Start" type="bgw" w="w200"/>
      </div>
    </div>
  </section>
  </>
  )
}

export default Home