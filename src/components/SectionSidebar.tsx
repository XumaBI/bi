import { useState } from 'react'
import { Link } from 'react-router-dom'

interface LinkItem {
  name: string
  path: string
}

interface SectionProps {
  title: string
  icon?: string
  links: LinkItem[]
  isClosed: boolean;
}

function Section({ title, icon, links, isClosed }: SectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`section ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      
      {/* Definicion de la seccion*/}
      <div className="grupo" > 
        <i className={`${icon} icono`}></i> 
        {!isClosed && <span>{title}</span>}
        {!isClosed && <span className="rotar"><i className="fas fa-chevron-down"></i></span>}
      </div>
      
      {/* Opciones de la sección */}
      {!isClosed && 
      <div className="section-content">
        {links.map((link, index) => (
          <div className="opcion" key={index}>
            <Link to={link.path}>{link.name}</Link>
          </div>
        ))}
      </div>
      }
    </div>
  )
}

export default Section

