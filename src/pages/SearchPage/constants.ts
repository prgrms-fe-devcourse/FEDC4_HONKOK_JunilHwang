import {
  CookImage,
  DecorImage,
  GeneralImage,
  HelpImage,
  CleanImage
} from '~/assets';

const BUTTON_LABELS = { all: '전체', post: '포스트', user: '유저' };

const CHANNEL_IMAGES = {
  '6512830b7e249d51ab26a374': HelpImage,
  '651283827e249d51ab26a3cb': CookImage,
  '651284807e249d51ab26a464': CleanImage,
  '651284217e249d51ab26a433': DecorImage,
  '651284c07e249d51ab26a494': GeneralImage
};

const SELECTED_TYPE_STYLES = {
  all: 'after:-translate-x-[33.5%]',
  post: 'after:-translate-x-0',
  user: 'after:translate-x-[33.5%]'
};

export { BUTTON_LABELS, CHANNEL_IMAGES, SELECTED_TYPE_STYLES };
