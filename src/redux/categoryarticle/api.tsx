import {API} from 'aws-amplify';

export interface CategoryArticleProps {
  page?: number;
  _id?: string;
  limit?: number;
  category?: string;
  language?: string;
  loggedIn?: boolean;
}

export const getCategorizedArticleApi = ({
  page,
  category,
  language,
}: CategoryArticleProps): Promise<any> => {
  const url = `article/category?page=${page}&limit=10&category=${category}&lang=${language}`;
  console.log('category article api is hit', page, category, language);
  let data = API.get('karobarUnauthApi', url, {});
  return data;
};

// export const getCategorizedArticleAuthApi = ({
//   page,
//   category,
//   language,
// }: CategoryArticleProps): Promise<any> => {
//   const url = `article/categoryauth?page=${page}&limit=1&category=${category}&lang=${language}`;
//   console.log('category auth article api is hit', page, category, language);
//   let data = API.get('karobarAuthApi', url, {});
//   return data;
// };

export const getAllCategoryApi = ({
  language,
}: CategoryArticleProps): Promise<any> => {
  const url = `category/getall?lang=${language}`;
  console.log('category api is hit');
  return API.get('karobarUnauthApi', url, {});
};
