<template>
  <div class="comment">
    <div class="left-box">
      <img src="@/assets/a.png" alt="" />
    </div>
    <div class="right-box">
      <div class="comment-top">
        <div>
          <a>用户昵称</a>
          <strong> </strong>
          <span>2022-11-23 12:09:24</span>
        </div>
        <div class="reply">回复</div>
      </div>
      <div class="comment-content">回复内容</div>
      <!-- 是否有回复 -->
      <div>
        <div class="comment-top comment-top-reply">
            <div class="comment-reply">
            <div class="left-box">
                <img src="@/assets/a.png" alt="" />
            </div>
            <span>
                用户昵称第三个是
                <span class="span-reply">回复</span>
                昵称只有八个字符
            </span>
            <strong> </strong>
            <span>2022-11-23 12:09:24</span>
            </div>
            <div class="reply">回复</div>
        </div>
        <div class="comment-content">回复内容案说法啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊按时地方烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦 爱上放大水水水水水水水水水水水水</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment'
}
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  span{
    color: #999;
  }
  .left-box {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .right-box {
    width: 100%;
    margin-left: 15px;
    .comment-top {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &-reply{
        padding-top: 10px;
      }
      strong {
        display: inline-block;
        width: 10px;
      }
      .reply{
        margin-left: 10px;
        color: #21abeb;
      }
      .reply:hover {
        cursor: pointer;
      }
      .span-reply {
        padding: 0 5px;
      }
      .comment-reply {
        display: flex;
        .left-box {
          margin-right: 10px;
        }
      }
    }
    .comment-content {
        width: 460px;
        padding: 5px;
    }
  }
}
</style>