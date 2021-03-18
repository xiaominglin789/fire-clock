;((doc) => {
  let defaultLanguage = 'CN'
  let dateStrArrayForLanguage
  const dateStrArrayForLanguages = {
    CN: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    EN: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  }
  const fontColorEnum = {
    White: 'white',
    Blue: 'blue',
    Green: 'green',
    Grey: 'grey',
    Orange: 'orange',
    Red: 'red',
    Yellow: 'yellow',
    Pink: 'pink',
    Rainbow: '',
  }

  // elements
  const clockElement = doc.querySelector('#clock')
  const dateElement = doc.querySelector('#date')
  const menuPanel = doc.querySelector('.menu')
  const btnElementLightOrNigth = doc.querySelector('#btn_light_or_nigth')
  const btnElementLanguage = doc.querySelector('#btn_language')
  const btnElementFontColor = doc.querySelector('#btn_font_color')
  // const btnElementFontSize = doc.querySelector('#btn_font_size')
  // const btnElementShowDate = doc.querySelector('#btn_show_date')
  // const btnElementHideDate = doc.querySelector('#btn_hide_date')
  // const btnElementMoreSetting = doc.querySelector('#btn_more_setting')
  // const btnElementThemes = doc.querySelector('#btn_themes')
  // const btnElementAbout = doc.querySelector('#btn_abort')

  // 可配置变量
  let dateFormatStyle = 0
  let showMenuPanelDefualt = false
  let showLightOrNigth = false
  let showDateElement = true
  let showLanguageChange = false

  // 检测当前是否为移动设备
  let isMobbile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
    navigator.userAgent,
  )
  // 第三方屏幕休眠插件
  let noSleep

  /** 项目初始化 */
  function init() {
    // 初始化显示的语言
    setAppLanguage()
    // 初始化组件事件绑定
    bindElementsEvents()
    // 初始化面板隐藏
    setShowMenuPanel(!showMenuPanelDefualt)
    // 初始化必要的第三方插件
    initSreenNoSleep()

    // 每秒更新时钟视图
    setInterval(() => {
      // 当前时间相关变量
      let { year, mouth, date, day, hour, minute, second } = getCurrentTime()
      // 设置时钟文本显示
      setClockElement(clockFormat(hour, minute, second))
      // 设置日期文本显示
      setDateElement(dateFormat(year, mouth, date, dateFormatStyle, day))
    }, 1000)
  }

  /** 第三方插件:noSleep的初始化 */
  function initSreenNoSleep() {
    if (isMobbile) {
      // 移动端下, 默认:开启屏幕常量
      // 方法会触发,可是不知为何 这个插件没有效果,
      noSleep = new NoSleep()
      doc.addEventListener(
        'click',
        function enableNoSleep() {
          doc.removeEventListener('click', enableNoSleep, false)
          noSleep.enable()
          alert('激活页面常亮')
        },
        false,
      )
    }
  }



  /** 元素节点的事件绑定 */
  function bindElementsEvents() {
    // 事件:点击时间弹出控制菜单
    clockElement &&
      clockElement.addEventListener('click', () => {
        showMenuPanelDefualt = !showMenuPanelDefualt
        setShowMenuPanel(!showMenuPanelDefualt)
      })
    // 事件: 昼夜亮度的切换
    btnElementLightOrNigth &&
      btnElementLightOrNigth.addEventListener('click', () => {
        // 调整时间组件的opacity
        showLightOrNigth = !showLightOrNigth
        setModelForLightOrNigth(showLightOrNigth)
      })
    // 事件: 切换语言
    btnElementLanguage &&
      btnElementLanguage.addEventListener('click', () => {
        showLanguageChange = !showLanguageChange
        if (!showLanguageChange) {
          // CN
          setAppLanguage('CN')
        } else {
          // EN
          setAppLanguage('EN')
        }
      })
    // 事件: 切换时钟的文本大小
    // 事件: 切换时钟的文本颜色
    // 事件: 切换日期的显示格式
    // 事件: 切换时钟的显示风格
    // 事件: 切换横竖屏
    // 事件: 打开更多设置
    // 事件: 查看关于
  }

  /**
   * 时间格式化
   * @param {*} hour 时
   * @param {*} minute 秒
   * @param {*} second 秒
   * @param {String} char 分隔的字符,默认: ':'
   * @returns {String} 格式化后的时间
   */
  function clockFormat(hour, minute, second, char = ':') {
    const clockStr = hour + char + minute + char + second
    return clockStr
  }

  /**
   * 日期格式化
   * @param {*} year 年
   * @param {*} mouth 日
   * @param {*} date 日
   * @param {Number} style 格式样式: 默认 0: yyyy-mm-dd, 1: yyyy/mm/dd, 2:yyyy年mm月dd日
   * @param {*} day 星期几, 可传
   * @returns {String} 格式化后的日期
   */
  function dateFormat(year, mouth, date, style = 0, day = '') {
    dateFormatStyle = style
    let dateStr
    switch (style) {
      case 0:
        dateStr = year + '-' + mouth + '-' + date + ' ' + day
        break
      case 1:
        dateStr = year + '/' + mouth + '/' + date + ' ' + day
        break
      case 2:
        if (defaultLanguage == 'CN') {
          dateStr = year + '年' + mouth + '月' + date + '日' + ' ' + day
        }
        break
      default:
        break
    }
    return dateStr
  }

  /**
   * 设置时间日期组件的昼夜亮度
   * @param {Boolean} light
   */
  function setModelForLightOrNigth(light = false) {
    if (light) {
      clockElement.style.opacity = 0.3
      dateElement.style.opacity = 0.3
    } else {
      clockElement.style.opacity = 1
      dateElement.style.opacity = 1
    }
  }

  /** 设置面板的显示隐藏,默认隐藏的:false */
  function setShowMenuPanel(isShow = true) {
    // console.log(menuPanel)
    let open = !isShow
    // console.log('open: ' + open)
    if (open) {
      // 显示菜单面板
      menuPanel.style.display = 'block'
    } else {
      // 显示菜单隐藏
      menuPanel.style.display = 'none'
    }
  }

  /** 设置时间组件显示 */
  function setClockElement(clockStr) {
    if (!clockStr) return
    clockElement.textContent = clockStr
  }

  /** 设置日期组件显示 */
  function setDateElement(dateStr) {
    if (!dateStr) return
    dateElement.textContent = dateStr
  }

  /**
   * 设置系统的显示语言,默认 CN
   * @param {String} area 地区: CN:国内, ZH:国外
   */
  function setAppLanguage(area = 'CN') {
    switch (area.toUpperCase()) {
      case 'CN':
        defaultLanguage = 'CN'
        dateStrArrayForLanguage = dateStrArrayForLanguages.CN
        break
      case 'EN':
        defaultLanguage = 'EN'
        dateStrArrayForLanguage = dateStrArrayForLanguages.EN
        break
      default:
        defaultLanguage = 'CN'
        break
    }
  }

  /**
   * 设置时分秒的字体大小
   * @param {*} size 字体大小,默认:48px
   */
  function setClockFontSize(size = 48) {
    if (!size) return
    console.log('时钟组件的原样式' + clockElement.style)
  }

  /**
   * 设置时间的组件颜色
   * @param {*} color 时间组件的字体颜色,默认:白色
   */
  function setClockFontColor(color = '#ffffff') {
    if (!color) return
    console.log('时间组件的字体颜色,默认:白色')
  }

  /** 数字填充 */
  function numberFormat(number, char = '0') {
    return number >= 10 ? number : '0' + number
  }

  /** 获取系统时间 */
  function getCurrentTime() {
    const currentTime = new Date()
    const year = currentTime.getFullYear()
    let mouth = currentTime.getMonth().toString()
    let date = currentTime.getDate()
    let day = currentTime.getDay()
    const hour = currentTime.getHours()
    let minute = currentTime.getMinutes()
    let second = currentTime.getSeconds()
    mouth = numberFormat(mouth)
    date = numberFormat(date)
    minute = numberFormat(minute)
    second = numberFormat(second)
    day = dateStrArrayForLanguage[day]
    return { currentTime, year, mouth, date, day, hour, minute, second }
  }

  /** 系统设置重置 */
  function appReset() {}

  init()
})(document)
