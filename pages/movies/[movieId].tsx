
import Head from "next/head";
import { IMovie } from "@/shared/types/IMovie";
import styles from '@/styles/Home.module.css'
import httpInstance from "@/shared/HttpService";
import { MovieDetails } from "@/templates";
import { GetServerSidePropsContext, GetStaticPathsContext, GetStaticPropsContext } from "next";

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

export const getStaticPaths = async () => {
  const response = await httpInstance.get(`movies`);
  const movies = await response.json() as { data: IMovie[] };
  return {
    paths: movies.data.map(m => ({ params: { movieId: m.id.toString() } })),
    fallback: false
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const movieId = (context.params as { movieId: string }).movieId;
  console.log('FETCHING MOVIE :>> ', movieId);
  const response = await httpInstance.get(`movies/${movieId}`);
  const movie = await response.json() as { data: IMovie };
  return {
    props: {
      movie: movie.data
    }
  }
}