import { IMovie } from '@/shared/types/IMovie';
import Link from 'next/link';
import styles from './movieList.module.css';


export default function MovieList({ movies }: { movies: IMovie[] }) {

  return (
    <div className={styles.container}>
      {movies.map(m => (
        <Link href={`/movies/${m.id}`} key={m.id.toString()}>
          <div className={styles.card} >
            <img src={m.attributes.imagePath} alt={m.attributes.name} />
            <div className={styles.description}>
              <p>{m.attributes.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

