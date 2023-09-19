import { useGetChannels, useGetPosts } from '~/services';

const ChannelPage = () => {
  const { data: channels = [] } = useGetChannels();
  const { data: posts } = useGetPosts({
    channelId: '64f843de36f4f3110a635033',
    limit: 5
  });

  return (
    <div>
      ChannelPage
      <div>
        {Array.from({ length: 10 }, (_, i) => i).map((item) => (
          <div key={item}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ab
            fuga odit quidem. Voluptates, quasi. Ipsa adipisci natus nisi
            molestias reiciendis accusantium minima, vitae explicabo quibusdam
            porro atque laborum harum.
          </div>
        ))}

        {posts?.pages.map((pageData, pageIndex) => (
          <ul key={pageIndex}>
            {pageData.map((item) => (
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;
