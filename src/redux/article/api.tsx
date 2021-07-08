import {API} from 'aws-amplify';

export interface ArticleProps {
  page?: number;
  _id?: string;
  limit?: number;
  language?: string;
  loggedIn?: boolean;
}

export const getAllArticleApi = ({
  page,
  language,
}: ArticleProps): Promise<any> => {
  const url = `article/getall?page=${page}&limit=10&lang=${language}`;
  console.log('article api is hit ', page);
  return API.get('karobarUnauthApi', url, {});
};

export const getFeaturedArticleApi = ({
  language,
}: ArticleProps): Promise<any> => {
  const url = `featured/list?lang=${language}`;
  console.log('featured article api is hit ');
  return API.get('karobarUnauthApi', url, {});
};

export const getEachArticleApi = ({_id}: ArticleProps): Promise<any> => {
  const url = `article/getone?_id=${_id}`;
  console.log('article each api is hit');
  return API.get('karobarUnauthApi', url, {});
};

export const getEachAuthArticleApi = ({_id}: ArticleProps): Promise<any> => {
  const url = `article/getoneauth?_id=${_id}`;
  console.log('article each api is hit');
  return API.get('karobarAuthApi', url, {});
};

export const getAllArticleAuthApi = ({
  page,
  language,
}: ArticleProps): Promise<any> => {
  const url = `article/auth/getall?page=${page}&limit=10&lang=${language}`;
  console.log('article auth api is hit', page);
  return API.get('karobarAuthApi', url, {});
};
