import { useState, useEffect } from 'react';
import {
  CombinedSearchResults,
  PostSearchResult,
  UserSearchResult
} from './components';
import { BUTTON_LABELS } from './constants';
import { SearchIcon } from '~/assets';
import { Button, Input } from '~/components/common';
import { Header } from '~/components/domain';
import { useForm } from '~/hooks';
import { useSearchAll } from '~/services/searchService';

type SelectedQuery = 'all' | 'post' | 'user';

const SELECTED_TYPE_STYLES = {
  all: 'after:-translate-x-[33.5%]',
  post: 'after:-translate-x-0',
  user: 'after:translate-x-[33.5%]'
};

const SearchPage = () => {
  const [query, handleQuery] = useForm();

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [selectedSearchType, setSelectedSearchType] =
    useState<SelectedQuery>('all');

  const {
    data: { parsedPostResults, userResults }
  } = useSearchAll({ query: debouncedQuery });

  const searchComponents = {
    all: CombinedSearchResults,
    post: PostSearchResult,
    user: UserSearchResult
  };

  const RenderedComponent = searchComponents[selectedSearchType];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;

    setSelectedSearchType(name as SelectedQuery);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  return (
    <article className="flex h-full flex-col">
      <Header leftArea="left-arrow" rightArea={false}>
        검색
      </Header>

      <section
        className={`
          relative flex border-b-2 border-gray-200 after:absolute after:-bottom-1 after:h-[5px] after:w-full after:scale-x-[0.30] after:rounded-full after:bg-main-base after:transition-all after:content-[""]
          ${SELECTED_TYPE_STYLES[selectedSearchType]}
        `}
      >
        {Object.keys(BUTTON_LABELS).map((key) => (
          <Button
            key={key}
            name={key}
            onClick={handleClick}
            className="h-full flex-1 py-3"
          >
            {BUTTON_LABELS[key as keyof typeof BUTTON_LABELS]}
          </Button>
        ))}
      </section>

      <section className="flex h-full w-full flex-col overflow-y-auto p-6">
        <div className="mb-6 flex w-full items-center rounded-lg border-[1px] text-sm">
          <Input
            onChange={handleQuery}
            type="search"
            className="flex-grow border-none outline-0 focus:outline-0"
            placeholder="검색어를 입력해주세요."
          />
          <SearchIcon className="mr-3 h-5 w-5 stroke-gray-200" />
        </div>

        <RenderedComponent
          onClick={(nweSelectedSearchType) =>
            setSelectedSearchType(nweSelectedSearchType)
          }
          parsedPostResults={parsedPostResults}
          userResults={userResults}
        />
      </section>
    </article>
  );
};

export default SearchPage;
