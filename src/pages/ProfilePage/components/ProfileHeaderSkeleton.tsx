import { PropsWithChildren } from 'react';

const InfoBox = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center text-gray-500">{children}</div>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <div className="border-b-2 border-gray-200 bg-white px-6 py-10">
      <div className="grid grid-cols-4 items-center justify-items-center">
        <div className="h-16 w-16 rounded-full bg-gray-200"> </div>
        <InfoBox>
          <div className="text-xs">게시물 수</div>
          <div className="h-4 bg-white"> </div>
        </InfoBox>

        <InfoBox>
          <div className="flex flex-col items-center">
            <div className="text-xs">팔로워</div>
            <div className="h-4 bg-white"> </div>
          </div>
        </InfoBox>

        <InfoBox>
          <div className="flex flex-col items-center">
            <div className="text-xs">팔로잉</div>
            <div className="h-4 bg-white"> </div>
          </div>
        </InfoBox>
      </div>

      <div className="mt-9 grid grid-cols-2 gap-7">
        <div className="box-content h-5 rounded-[0.625rem] border-[1.5px] bg-gray-200 p-2">
          {' '}
        </div>
        <div className="box-content h-5 rounded-[0.625rem] border-[1.5px] bg-gray-200 p-2">
          {' '}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
