import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function AppLayout() {
  // h-screen + overflow-hidden pins the app to exactly the window height, so
  // nothing scrolls the page itself. min-h-0 on main lets inner panels (the
  // sidebar) own their scrolling instead of stretching the layout.
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
