import { IMovie } from '@/shared/types/IMovie';
import styles from './movieDetails.module.css';

export default function MovieDetails({ movie }: { movie: IMovie }) {
  return (
    <div className={styles.container}>
      <img src={movie.attributes.imagePath} alt={movie.attributes.name} />
      <div className={styles.description}>
        <h1>{movie.attributes.name}</h1>
        <p dangerouslySetInnerHTML={{ __html: movie.attributes.synopsis }} />
      </div>
    </div>
  )
}