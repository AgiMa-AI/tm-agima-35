
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // 初始化时立即检查窗口大小
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // 创建媒体查询
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // 监听媒体查询变化
    const onChange = () => {
      checkMobile()
    }
    
    // 现代浏览器中的事件监听方式
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
    } else {
      // 兼容旧版浏览器
      window.addEventListener('resize', onChange)
    }
    
    // 初始化时立即检查
    checkMobile()
    
    return () => {
      // 清理事件监听器
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else {
        window.removeEventListener('resize', onChange)
      }
    }
  }, [])

  // 在初始值未确定前，通过窗口宽度进行快速判断
  return isMobile !== undefined ? isMobile : window.innerWidth < MOBILE_BREAKPOINT
}

// 额外导出一个获取当前视口宽度的钩子
export function useViewportWidth() {
  const [width, setWidth] = React.useState<number>(window.innerWidth)
  
  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return width
}
