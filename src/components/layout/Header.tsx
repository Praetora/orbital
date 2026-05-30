import { NavLink } from 'react-router-dom'
import { Moon, Sun, Satellite } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn('text-sm text-white/60 transition-colors hover:text-white', isActive && 'text-white')

export function Header() {
  const { theme, toggle } = useTheme()
  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-3">
      <div className="flex items-center gap-2">
        <Satellite className="h-5 w-5 text-sky-400" />
        <span className="font-semibold tracking-tight">Orbital</span>
      </div>
      <nav className="flex items-center gap-6">
        <NavLink to="/" className={linkClass} end>
          Globe
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <Button variant="ghost" onClick={toggle} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </nav>
    </header>
  )
}
