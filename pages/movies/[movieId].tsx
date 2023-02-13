
import Head from "next/head";
import { IMovie } from "@/shared/types/IMovie";
import styles from '@/styles/Home.module.css'
import httpInstance from "@/shared/HttpService";
import { MovieDetails } from "@/templates";
import { GetServerSidePropsContext } from "next";

export default function Movie({ movie }: { movie: IMovie }) {
  return (<>
    <Head>
      <title>{movie.attributes.name}</title>

    </Head>
    <main className={styles.main}>
      <MovieDetails movie={movie} />
    </main>
  </>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await httpInstance.get(`movies/${(context.params as { movieId: string }).movieId}`);
  const movie = await response.json() as { data: IMovie };
  console.log('movie :>> ', movie);
  return {
    props: {
      movie: movie.data
    }
  }
}