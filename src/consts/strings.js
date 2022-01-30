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

export const SIGNOUT_PROMPT = '로그아웃하시겠습니까?';

export const SIGNOUT_MESSAGE = {
  before: '로그아웃 준비 중...',
  loading: '로그아웃 중...',
  success: '로그아웃 성공',
  error: '로그아웃에 실패하였습니다.',
};
