import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import httpInstance from '@/shared/HttpService'
import { MovieList } from '@/templates'
import { IMovie } from '@/shared/types/IMovie'

const inter = Inter({ subsets: ['latin'] })

export default function Movies({ movies }: { movies: IMovie[] }) {
  return (
    <>
      <Head>
        <title>Best movies ever</title>
        {/* <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main}>
        <MovieList movies={movies} />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const response = await httpInstance.get('movies');
  const movies = await response.json() as { data: IMovie[] };
  return {
    props: {
      movies: movies.data
    }
  }
}