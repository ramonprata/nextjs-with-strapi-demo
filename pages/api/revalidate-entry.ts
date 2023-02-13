// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

enum strapiModels {
  movie = 'movie',
}

enum HeadlessCMSEventsEnum {
  create = 'entry.create',
  update = 'entry.update',
  publish = 'entry.publish',
  unpublish = 'entry.unpublish',
}

type TStrapiEventBody = {
  event: HeadlessCMSEventsEnum;
  model: string;
  entry: {
    id: string;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body as TStrapiEventBody;

    const model = data.model;
    if (model) {
      try {
        const pathRevalidate = getRoutesRevalidateBasedOnEvent(data.event);
        if (pathRevalidate) {
          if (pathRevalidate === 'all') {
            revalidateAll(res, data.entry.id.toString());
          } else {
            revalidateMovie(res, data.entry.id.toString());
          }
        } else {
          forwardRes(res, 422, false);
        }
      } catch (error) {
        res.status(404).json({
          revalidated: false,
        });
      }
    }
  }
  res.status(200);
}

const getRoutesRevalidateBasedOnEvent = (event: HeadlessCMSEventsEnum) => {
  const eventsToRevalidadeMovies = [HeadlessCMSEventsEnum.unpublish, HeadlessCMSEventsEnum.publish];
  if (event === HeadlessCMSEventsEnum.update) {
    return 'all';
  }
  if (eventsToRevalidadeMovies.includes(event)) {
    return 'movies';
  }
  return null;
};

const revalidateMovie = async (res: NextApiResponse, movieId: string) => {
  await res.revalidate(`/movies/${movieId}`);
  forwardRes(res, 200, true);
};

const revalidateMovies = async (res: NextApiResponse) => {
  await res.revalidate(`/movies`);
  forwardRes(res, 200, true);
};

const revalidateAll = async (res: NextApiResponse, movieId: string) => {
  await res.revalidate(`/movies`);
  await res.revalidate(`/movies/${movieId}`);
  forwardRes(res, 200, true);
};

const forwardRes = (res: NextApiResponse, status: number, revalidated: boolean) => {
  res.status(status).json({
    revalidated: revalidated,
  });
};
