import { seatedManImage } from '~/assets';

const ChannelInfo = () => {
  return (
    <div className="h-60 bg-main-lighten p-6">
      <div className="flex">
        <div className="grow">
          <p className="text-[0.9375rem]">이 시각</p>
          <p className="mb-[0.64rem] text-[1.25rem] text-white">
            지금 불타는 채널
          </p>
          <span className="rounded-[1.25rem] bg-white p-1 px-2 text-[0.625rem] text-sub-red">
            HOT
          </span>
          <p className="mt-3 text-xs text-gray-100">
            사람들이 가장 활발하게
            <br />
            이용하는 채널을 확인해보세요!
          </p>
        </div>
        <img src={seatedManImage} alt="채널 소개 이미지" />
      </div>
    </div>
  );
};

export default ChannelInfo;
