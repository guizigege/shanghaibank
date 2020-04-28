<script lang="ts" src="./app.ts"></script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200px 0;
    box-sizing: border-box;
  }
  body{
    background: whitesmoke;
  }
  /*通用类*/
  /*清除浮动*/
  .clearfix {
    height: 0;
    line-height: 0;
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  /*下边线*/
  .bottom-line {
    border-bottom: 0.5px solid #ddd;
  }

</style>
