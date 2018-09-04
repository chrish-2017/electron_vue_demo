<template>
  <div class="wrapper">
    <Button type="primary" @click="checkForUpdates">获取更新</Button>
    <Progress :percent="percent" />
    <Timeline pending>
      <TimelineItem v-for="message in messageList">{{message}}</TimelineItem>
    </Timeline>
    <Modal
      v-model="modalShow"
      :title="modalTitle"
      :closable="false"
      :mask-closable="false">
      <div>
        {{updateInfo.releaseNotes || '无'}}
      </div>
      <div slot="footer">
        <Button @click="modalShow = false">暂不下载</Button>
        <Button type="primary" @click="downloadUpdate">下载更新</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  data () {
    return {
      percent: 0,
      messageList: [],
      modalShow: false,
      updateInfo: {}
    }
  },
  computed: {
    modalTitle () {
      return this.updateInfo.version + '版本说明'
    }
  },
  methods: {
    checkForUpdates () {
      this.messageList = []
      ipcRenderer.send('checkForUpdates')
    },
    downloadUpdate () {
      ipcRenderer.send('downloadUpdate')
      this.modalShow = false
    }
  },
  created () {
    ipcRenderer.on('update-message', (event, { message, data }) => {
      if (message === 'download-progress') {
        this.percent = parseInt(data.percent)
      } else {
        this.messageList.push(message)
        if (message === 'update-available') {
          this.updateInfo = data
          this.modalShow = true
        } else if (message === 'update-downloaded') {
          this.$Modal.confirm({
            title: '立即安装',
            onOk: () => {
              ipcRenderer.send('installNow')
            }
          })
        }
      }
    })
  }
}
</script>

<style>

</style>
