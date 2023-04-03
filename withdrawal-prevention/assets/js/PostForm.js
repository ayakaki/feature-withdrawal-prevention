// 遷移先
const thanksPath = 'pages/thanks/index.html';

const postForm = () => {
  validateForm();
  postAction();
};

// バリデーションメソッド
const validateForm = () => {
  console.log('call validateForm');
};

// フォーム内容ポストメソッド
const postAction = () => {
  console.log('call postAction');

  // POST 成功時にサンクスページに遷移する
  window.location.href = thanksPath;
};
