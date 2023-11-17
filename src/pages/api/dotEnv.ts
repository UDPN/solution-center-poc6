import DotEnv from 'dotenv';

DotEnv.config();

const dotEnv = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('success');
};
export default dotEnv;
