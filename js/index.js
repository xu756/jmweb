window.onload = function () {
  const li = document.querySelectorAll("#wraper > div.P_N > div > ul > li");
  for (let i = 0; i < li.length; i++) {
    li[i].addEventListener("mouseover", function () {
      for (let j = 0; j < li.length; j++) {
        li[j].querySelector(".nav_box").classList.remove("n_a");
        if (li[j].querySelector(".nav_ch")) {
          li[j].querySelector(".nav_ch").classList.remove("active");
        }
      }
      this.querySelector(".nav_box").classList.add("n_a");
      if (this.querySelector(".nav_ch")) {
        this.querySelector(".nav_ch").classList.add("active");
      }
      this.addEventListener("mouseleave", function () {
        if (this.querySelector(".nav_ch")) {
          this.querySelector(".nav_ch").classList.remove("active");
        }
        for (let j = 0; j < li.length; j++) {
          li[j].querySelector(".nav_box").classList.remove("n_a");
        }
        li[0].querySelector(".nav_box").classList.add("n_a");
      });
    });
  }
};
//  轮播图
$(document).ready(function () {
  $("#select_btn li:first").css("border", "none");
  if ($("#zSlider").length) {
    zSlider();
    $("#h_sns")
      .find("img")
      .click(
        function () {
          $(this).fadeTo(200, 0.5);
        },
        function () {
          $(this).fadeTo(100, 1);
        }
      );
  }
  function zSlider(ID, delay) {
    var ID = ID ? ID : "#zSlider";
    var delay = delay ? delay : 5000;
    var currentEQ = 0,
      picnum = $("#picshow_img li").size(),
      autoScrollFUN;
    $("#select_btn li").eq(currentEQ).addClass("current");
    $("#picshow_img li").eq(currentEQ).show();
    $("#picshow_tx li").eq(currentEQ).show();
    autoScrollFUN = setTimeout(autoScroll, delay);
    function autoScroll() {
      clearTimeout(autoScrollFUN);
      currentEQ++;
      if (currentEQ > picnum - 1) currentEQ = 0;
      $("#select_btn li").removeClass("current");
      $("#picshow_img li").hide();
      $("#picshow_tx li").hide().eq(currentEQ).slideDown(400);
      $("#select_btn li").eq(currentEQ).addClass("current");
      $("#picshow_img li").eq(currentEQ).show();
      autoScrollFUN = setTimeout(autoScroll, delay);
    }
    $("#picshow").click(
      function () {
        clearTimeout(autoScrollFUN);
      },
      function () {
        autoScrollFUN = setTimeout(autoScroll, delay);
      }
    );
    $("#select_btn li").click(function () {
      var picEQ = $("#select_btn li").index($(this));
      if (picEQ == currentEQ) return false;
      currentEQ = picEQ;
      $("#select_btn li").removeClass("current");
      $("#picshow_img li").hide();
      $("#picshow_tx li").hide().eq(currentEQ).slideDown(100);
      $("#select_btn li").eq(currentEQ).addClass("current");
      $("#picshow_img li").eq(currentEQ).show();
      return false;
    });
  }
});
//卡片轮播图
function cardswiper(e) {
  this.cards = document.querySelectorAll(e.cards);
  this.w = e.w; //一个卡片宽度
  this.num = this.cards.length; //卡片个数
  this.X = 0; //最中间
  this.Awidth = e.Awidth;
  this.card_swiperPy = e.Awidth / (this.num - 1);
  this.init();
  this.run();
  return this;
}

//定义原型函数
cardswiper.prototype = {
  constructor: cardswiper,
  init: function () {
    for (let index = 0; index < this.num; index++) {
      var lr = 1; //右侧为-1
      // 判断向左还是向右
      if (
        index - this.X > this.num / 2 ||
        (index - this.X < 0 && this.X - index < this.num / 2)
      ) {
        lr = -1;
      }
      var i = Math.abs(index - this.X); //取绝对值
      if (i > this.num / 2) {
        i = parseInt(this.X) + parseInt(this.num) - index;
      }
      if (index - this.X < -this.num / 2) {
        i = parseInt(this.num) + index - this.X;
      }
      this.cards[index].style.marginLeft =
        -this.w / 2 + this.card_swiperPy * lr * i + "px"; //位置
      this.cards[index].style.zIndex = this.num - i; //层级
      this.cards[index].style.transform = "scale(" + Math.pow(0.9, i) + ")"; //缩放
      this.cards[index].style.opacity = Math.pow(0.9, i); //透明
      this.cards[index].setAttribute("index", index);
    }
  },
  //自动播放
  run: function () {
    var that = this;
    var autoplay = setInterval(function () {
      that.X++;
      if (that.X == 10) {
        that.X = 0;
      }
      that.init();
    }, 3000);
    for (let j = 0; j < this.num; j++) {
      this.cards[j].addEventListener("click", function () {
        that.X = this.getAttribute("index");
        that.init();
      });
    }
  },
};

//调用
var card = new cardswiper({
  cards: ".card_swiper-item",
  w: 382,
  Awidth: 1024,
});
