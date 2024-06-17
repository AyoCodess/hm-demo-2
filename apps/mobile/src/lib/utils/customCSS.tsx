import { IS_IOS } from './platform';

export const bigShadow = {
  borderRadius: 40,
  shadowColor: !IS_IOS ? 'lightgray' : 'gray',
  shadowOffset: {
    width: 0,
    height: 18
  },
  shadowOpacity: 0.15,
  shadowRadius: 30.0,
  elevation: 24
};

export const mediumShadow = {
  borderRadius: 40,
  shadowColor: !IS_IOS ? 'lightgray' : 'gray',
  shadowOffset: {
    width: 1,
    height: 47.75
  },
  shadowOpacity: !IS_IOS ? 0.0625 : 0.07,
  shadowRadius: 19.55,
  elevation: 50
};

export const basicShadow = {
  borderRadius: 40,
  shadowColor: !IS_IOS ? 'lightgray' : 'gray',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowOpacity: 0.17,
  shadowRadius: 3.05,
  elevation: 4
};
