import {
  CookImage,
  DecorImage,
  GeneralImage,
  LogoImage,
  HelpImage
} from '~/assets';

const BUTTON_LABELS = { all: '전체', post: '포스트', user: '유저' };

const CHANNEL_NAMES = {
  '650940038fb5004d94225763': '도와주세요',
  '650940138fb5004d94225767': '요리조리',
  '6509408d8fb5004d94225783': '청소의달인',
  '650940558fb5004d9422576b': '집꾸미기',
  '6509411c8fb5004d942257bb': '자유'
};

const CHANNEL_IMAGES = {
  '650940038fb5004d94225763': HelpImage,
  '650940138fb5004d94225767': CookImage,
  '6509408d8fb5004d94225783': LogoImage,
  '650940558fb5004d9422576b': DecorImage,
  '6509411c8fb5004d942257bb': GeneralImage
};

export { BUTTON_LABELS, CHANNEL_NAMES, CHANNEL_IMAGES };
