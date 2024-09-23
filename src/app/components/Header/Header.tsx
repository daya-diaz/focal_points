import Image from "next/image";
import logo from '@/assets/logo.png';
import styles from './Header.module.scss';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

const Header: React.FC = () => {

  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: pt });
  const dateWithCapital = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  return(
    <header className={styles.container}>
      <Image src={logo} alt="Logo" width={150} height={36} />
      <h1 className={styles.title}>Bem-vindo de volta, Marcus</h1>
      <span className={styles.date}>{dateWithCapital}</span>
    </header>
  )
}

export default Header;