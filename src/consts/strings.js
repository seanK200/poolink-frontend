// Login
export const LOGIN_MESSAGE = {
  loading: '로그인 중...',
  success: '로그인 성공',
  error: {
    idpiframe_initialization_failed:
      'Google 로그인에 실패하였습니다. 브라우저 설정에서 서드파티 쿠키를 허용해 주세요.',
    popup_closed_by_user:
      '로그인 창이 닫혀 로그인이 취소되었습니다. 재시도 후 창이 자동으로 닫힐 때까지 기다려주세요.',
    access_denied:
      'Google 계정 정보에 접근할 수 없습니다. Google 계정 설정에서 Poolink의 개인정보 접근을 허용해주세요.',
    default: '로그인 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주십시오.',
  },
};

// Signout
export const SIGNOUT_PROMPT = '로그아웃하시겠습니까?';

export const SIGNOUT_MESSAGE = {
  before: '로그아웃 준비 중...',
  loading: '로그아웃 중...',
  success: '로그아웃 성공',
  error: '로그아웃에 실패하였습니다.',
};

// Modal
export const MODAL_CLOSE_MESSAGE = '창을 닫으시겠습니까?';
export const DATA_LOSS_WARNING = '저장되지 않은 데이터는 지워질 수 있습니다.';

// Add link
export const ADD_LINK_URL_MESSAGE = {
  invalidURL: '유효한 인터넷 주소 (URL)이 아닙니다.',
  invalidURLProtocol:
    'URL은 "http://", "https://" 등과 같은 유효한 프로토콜로 시작해야 합니다.',
};

// Board
export const BOARD_DELETE_WARNING =
  '현재 보드와 보드에 저장된 모든 링크를 삭제하시겠습니까?';

// Links
export const LINK_DELETE_WARNING = '선택한 링크를 삭제하시겠습니까?';

// Emoji Picker
export const emojiPlaceholder = '이모티콘 검색';

export const emojiGroupNames = {
  smileys_people: '표정 및 사람',
  animals_nature: '동물 및 자연',
  food_drink: '음식 및 음료',
  travel_places: '여행 및 장소',
  activities: '활동',
  objects: '사물',
  symbols: '기호',
  flags: '깃발',
  recently_used: '최근 사용',
};
