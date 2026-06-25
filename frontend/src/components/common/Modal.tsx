import type { ReactNode } from 'react'
import { Button } from './Button'

interface ModalProps {
  title: string
  children: ReactNode
  onClose: () => void
}

export function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close modal">
            Cancel
          </Button>
        </div>
        {children}
      </section>
    </div>
  )
}
