// 封装loading方法
import _that from '@/main';
import { Loading } from 'element-ui';
const loading = command => {
    // command 为 接收的命令 ( start | close )
    if (!command) throw new Error('command is not defined')
    if (command == 'start') {
        _that.loadingInstance = Loading.service({
            fullscreen: true,
            target: 'document.body',
            lock: true,
            text: '加载中...',
            background: 'rgba(0, 0, 0, .6)'
        })
    } else if (command == 'close') {
        // 以服务的方式调用的 Loading 需要异步关闭
        _that.$nextTick(() => {
            _that.loadingInstance.close()
        })
    }
}
export default loading;