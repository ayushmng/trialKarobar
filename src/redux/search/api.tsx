import {API} from 'aws-amplify';

export interface SearchContentProps {
  page: number;
  limit?: number;
  term?: string;
  date?: string;
  category?: string;
}

export const getSearchContentApi = ({
  page,
  term,
  date,
  category,
}: SearchContentProps): Promise<any> => {
  console.log(
    'search api hit page is ',
    page,
    'term is ',
    term,
    'date is',
    date,
    'category is ',
    category,
  );
  const url =
    date && category && category != ''
      ? `search/content?page=${page}&limit=10&term=${term}&date=${date}&category=${category}`
      : category
      ? `search/content?page=${page}&limit=10&term=${term}&category=${category}`
      : `search/content?page=${page}&limit=10&term=${term}`;
  return API.get('karobarUnauthApiSearch', url, {});
};

export const getSearchContentMetaApi = (): Promise<any> => {
  const url = `search/contentmeta`;
  console.log('search content meta api is hit');
  return API.get('karobarUnauthApiSearch', url, {});
};
