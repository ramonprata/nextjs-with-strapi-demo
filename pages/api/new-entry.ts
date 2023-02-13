// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

enum strapiModels {
  movie = 'movie',
}

enum StrapiEventsEnum {
  create = 'entry.create',
  update = 'entry.update',
}

type TStrapiEventBody = {
  event: 'entry.create' | 'entry.update';
  model: string;
  entry: {
    id: string;
  };
};

const revalidateMovie = async (res: NextApiResponse, movieId: string) => {
  console.log('REVALIDATE :>>', movieId);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body as TStrapiEventBody;
    if ((data.event && data.event === StrapiEventsEnum.create) || StrapiEventsEnum.update) {
      const model = data.model;
      if (model) {
        await res.revalidate(`/movies/${data.entry.id.toString()}`);
        res.status(200).json({
          revalidated: true,
        });
      }
    }
    console.log('THIS WAS A POST REQUEST');
  }
  res.status(200);
}
