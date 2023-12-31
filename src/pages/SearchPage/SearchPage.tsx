import { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import {
  CombinedSearchResults,
  PostSearchResult,
  UserSearchResult,
  SearchTypeButtons
} from './components';
import { SearchIcon } from '~/assets';
import { Input } from '~/components/common';
import { Header } from '~/components/domain';
import { useSearchAll } from '~/services/searchService';

type SelectedQuery = 'all' | 'post' | 'user';

const useForm = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return [value, handleChange] as const;
};

const SELECTED_TYPE_STYLES = {
  all: 'after:-translate-x-[33.5%]',
  post: 'after:-translate-x-0',
  user: 'after:translate-x-[33.5%]'
};

const SearchPage = memo(() => {
  const [query, handleQuery] = useForm();

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedSearchType, setSelectedSearchType] =
    useState<SelectedQuery>('all');

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: { parsedPostResults, userResults }
  } = useSearchAll({ query: debouncedQuery });

  const searchComponents = useMemo(
    () => ({
      all: (
        <CombinedSearchResults
          onClick={(nweSelectedSearchType) =>
            setSelectedSearchType(nweSelectedSearchType)
          }
          parsedPostResults={parsedPostResults}
          userResults={userResults}
        />
      ),
      post: <PostSearchResult parsedPostResults={parsedPostResults} />,
      user: <UserSearchResult userResults={userResults} />
    }),
    [parsedPostResults, userResults]
  );

  const RenderedComponent = useMemo(
    () => searchComponents[selectedSearchType],
    [selectedSearchType, searchComponents]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { name } = event.currentTarget;

      setSelectedSearchType(name as SelectedQuery);
    },
    []
  );

  const SearchIconComponent = useMemo(
    () => <SearchIcon className="mr-3 h-5 w-5 stroke-gray-200" />,
    []
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  return (
    <article className="flex h-full flex-col bg-white">
      <Header leftArea="left-arrow" rightArea={false}>
        검색
      </Header>

      <section
        className={`
          relative flex border-b-2 border-gray-200 after:absolute after:-bottom-1 after:h-[5px] after:w-full after:scale-x-[0.30] after:rounded-full after:bg-main-base after:transition-all after:duration-[400ms] after:content-[""]
          ${SELECTED_TYPE_STYLES[selectedSearchType]}
        `}
      >
        <SearchTypeButtons handleClick={handleClick} />
      </section>

      <section className="flex h-full w-full flex-col overflow-y-auto bg-gray-100 p-6">
        <div className="mb-6 flex w-full items-center rounded-lg border-[1px] bg-white text-sm">
          <Input
            ref={inputRef}
            onChange={handleQuery}
            type="search"
            className="flex-grow border-none outline-0 focus:outline-0"
            placeholder="검색어를 입력해주세요."
          />

          {SearchIconComponent}
        </div>
        {RenderedComponent}
      </section>
    </article>
  );
});

export default SearchPage;
