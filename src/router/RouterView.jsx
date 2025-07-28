import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * 路由渲染组件
 * 根据路由配置动态生成路由
 */
const RouterView = ({ routes }) => {
  // 递归渲染路由
  const renderRoutes = (routeList) => {
    return routeList.map((route, index) => {
      const { path, element, children, index: isIndex, ...rest } = route

      if (isIndex) {
        // 索引路由
        return <Route key={index} index element={element} {...rest} />
      }

      if (children && children.length > 0) {
        // 有子路由的路由
        return (
          <Route key={path || index} path={`${path}`} element={element} {...rest}>
            {renderRoutes(children)}
          </Route>
        )
      }

      // 普通路由
      return <Route key={path || index} path={path} element={element} {...rest} />
    })
  }

  return <Routes>{renderRoutes(routes)}</Routes>
}

RouterView.propTypes = {
  routes: PropTypes.array.isRequired
}

export default RouterView