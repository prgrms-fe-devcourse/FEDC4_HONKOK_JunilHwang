import {
  CookImage,
  DecorImage,
  GeneralImage,
  HelpImage,
  CleanImage
} from '~/assets';

const BUTTON_LABELS = { all: '전체', post: '포스트', user: '유저' };

const CHANNEL_IMAGES = {
  '650940038fb5004d94225763': HelpImage,
  '650940138fb5004d94225767': CookImage,
  '6509408d8fb5004d94225783': CleanImage,
  '650940558fb5004d9422576b': DecorImage,
  '6509411c8fb5004d942257bb': GeneralImage
};

const SELECTED_TYPE_STYLES = {
  all: 'after:-translate-x-[33.5%]',
  post: 'after:-translate-x-0',
  user: 'after:translate-x-[33.5%]'
};

export { BUTTON_LABELS, CHANNEL_IMAGES, SELECTED_TYPE_STYLES };
