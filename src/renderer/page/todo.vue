<template>
  <div class="wrapper">
    <div v-show="!modalShow" class="add" @click="modalShow = true">
      <Icon type="md-add" class="icon" />
      <div class="text">新建待办</div>
    </div>
    <div v-show="modalShow" class="dialog">
      <Input v-model="todoItem.content" type="textarea" :rows="4" placeholder="写下你的待办事项" />
      <div class="notice">
        <Icon type="ios-add-circle-outline" class="icon" />
        <span class="text">添加日程提醒</span>
      </div>
      <div class="operation">
        <Button type="primary" @click="save">保存</Button>
        <Button @click="modalShow = false">取消</Button>
      </div>
    </div>
    <div class="list">
      <ul>
        <li v-for="item in todoList" :key="item.content">
          <Icon type="md-radio-button-off" class="icon" @click="done(item)" />
          <div class="text">{{item.content}}</div>
        </li>
      </ul>
    </div>
    <div v-if="doneLength" class="title" @click="showOrHide">
      <Icon v-show="!doneShow" type="ios-arrow-down" />
      <Icon v-show="doneShow" type="ios-arrow-up" />
      <span>{{doneShow ? '隐藏' : '显示'}}已完成的待办 · {{doneLength}}</span>
    </div>
    <div v-show="doneShow" class="list done">
      <ul>
        <li v-for="item in doneList" :key="item.content">
          <Icon type="md-checkmark-circle-outline" class="icon" @click="undo(item)" />
          <div class="text">{{item.content}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modalShow: false,
      todoItem: {
        content: ''
      },
      todoList: [
        {
          content: '1'
        }
      ],
      doneList: [
        {
          content: '2'
        }
      ],
      doneShow: true
    }
  },
  computed: {
    doneLength () {
      return this.doneList.length
    }
  },
  methods: {
    save () {
      if (this.todoItem.content) {
        const data = JSON.parse(JSON.stringify(this.todoItem))
        this.todoList.unshift(data)
      }
      this.modalShow = false
    },
    done (item) {
      this.doneList.unshift(item)
      const index = this.todoList.indexOf(item)
      this.todoList.splice(index, 1)
    },
    undo (item) {
      this.todoList.unshift(item)
      const index = this.doneList.indexOf(item)
      this.doneList.splice(index, 1)
    },
    showOrHide () {
      this.doneShow = !this.doneShow
    }
  }
}
</script>

<style lang="scss">
  ul,li {
    list-style: none;
  }
  $dialog-padding: 40px;
  $dialog-height: 150px + $dialog-padding * 2;
  .wrapper {
    padding-top: 20px;
    .add {
      font-size: 16px;
      color: #2d8cf0;
      cursor: pointer;
      padding: 0 40px 0 58px;
      position: relative;
      .icon {
        position: absolute;
        left: 42px;
        line-height: 45px;
      }
      .text {
        padding: 10px 0 10px 10px;
        border-bottom: 1px solid #f2f2f2;
      }
    }
    .title {
      font-size: 14px;
      color: #777;
      line-height: 30px;
      width: 200px;
      margin: 25px auto;
      background: #f2f2f2;
      text-align: center;
      cursor: default;
      border-radius: 2px;
    }
    .list {
      li {
        line-height: 70px;
        padding: 0 40px 0 70px;
        position: relative;
        .icon {
          position: absolute;
          left: 40px;
          font-size: 20px;
          color: #c5c8ce;
          cursor: pointer;
          line-height: 70px;
          &:hover {
            color: #2d8cf0;
          }
        }
        .text {
          font-size: 14px;
          color: #333;
          border-bottom: 1px solid #f2f2f2;
          cursor: pointer;
        }
      }
      &.done {
        .text {
          color: #ccc;
          text-decoration: line-through;
        }
      }
    }
  }
  .dialog {
    height: $dialog-height;
    position: relative;
    box-shadow: 0 0 20px #ccc;
    padding: $dialog-padding;
    .notice {
      position: absolute;
      left: $dialog-padding;
      bottom: $dialog-padding;
      line-height: 34px;
      .icon {
        font-size: 20px;
        color: #2d8cf0;
      }
      .text {
        font-size: 14px;
        color: #999;
        vertical-align: middle;
      }
    }
    .operation {
      position: absolute;
      right: $dialog-padding;
      bottom: $dialog-padding;
    }
  }
</style>
