/////////////////////////////////
// 入力エリアのid候補リスト
/////////////////////////////////

const INPUT_ELEMENT_IDS = ['userName', 'favoriteColor', 'age'];

/////////////////////////////////
// ブラウザバック対策
/////////////////////////////////

$(() => {
  $(document).ready(() => {
    ((b) => {
      var c = function () {
        this.initialize();
      };
      c.prototype = {
        initialize: function () {
          history.replaceState('beforeunload', null, null);
          history.pushState(null, null, null);
          b(window).on('popstate', b.proxy(this.popstate, this));
        },
        popstate: function (b) {
          if (b.originalEvent.state === 'beforeunload') {
            viewPreventDialogWrapper();
          }
        },
        pushstate: function (b) {
          if (b.originalEvent.state === 'beforeunload') {
            viewPreventDialogWrapper();
          }
        },
      };
      new c();
    })($);
  });
  // 戻るボタン押下時、ダイアログを非表示にする
  $('#answerBack').on('click', function () {
    $('#preventDialogWrapper').hide();
  });
  function viewPreventDialogWrapper() {
    // 離脱防止ダイアログが表示されているか
    var isDialogView = $('#preventDialogWrapper').css('display') !== 'none';

    if (isDialogView) {
      // 離脱防止ダイアログ表示中にブラウザバック押下 -> ブラウザバックを行う
      window.history.back();
    } else {
      // 離脱防止ダイアログ非表示中にブラウザバック押下 -> 離脱防止ダイアログを表示
      history.pushState(null, null, null);
      $('#preventDialogWrapper').show();
      localStorage.setItem('POSITION_Y', positionY);
    }
  }
});

/////////////////////////////////
// タブを閉じる対策
/////////////////////////////////
window.onbeforeunload = (e) => {
  var isInputed = false;
  INPUT_ELEMENT_IDS.map((inputElementId) => {
    if (document.getElementById(inputElementId) === null) return;
    if (document.getElementById(inputElementId).value.length > 0)
      isInputed = true;
  });

  console.log('isInputed->', isInputed);

  // 文字が入力されている場合 -> ブラウザ標準ダイアログを出力
  if (isInputed) return ' ';
};

/////////////////////////////////
// ダイアログ出力時に、ダイアログ以外の範囲押下でダイアログ非表示
/////////////////////////////////

// クリックイベント全てに対しての処理
$(document).on('click touchend', function (event) {
  // 表示したポップアップ以外の部分をクリックしたとき
  if (!$(event.target).closest('.prevent_dialog').length) {
    $('.prevent_dialog_wrapper').hide();
  }
});

/////////////////////////////////
// ダイアログ出力時、元のスクロール位置を再現
/////////////////////////////////

window.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('scroll', function () {
    var positionY = localStorage.getItem('POSITION_Y');

    if (positionY !== null) {
      document.documentElement.scrollTop = positionY;
      localStorage.removeItem('POSITION_Y');
    }
  });
});
